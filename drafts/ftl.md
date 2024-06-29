# API-first design

The key idea in FTL is to design the API first, and then build the microkernel for it. In other words, how do we wan to write userspace components? This is the opposite of the trendy approach, where a [policy-free](https://en.wikipedia.org/wiki/Separation_of_mechanism_and_policy), minimalistic, and secure microkernel is designed first, and then the userspace is built on top of it.

To understand how FTL apps look like, let's design its API step by step. First, we need the entry point of the app, that is `main` function:

```rs
pub fn main() {
}
```

Looks super intuitive, right? Now, we want to receive messages from others so that we can serve something useful, in this example let's build a simple ping-pong server:

```rs
pub fn main() {
    let ch = todo!(); // the client channel from somewhere
    loop {
        let m = ch.recv();
        match m {
            Message::Ping(m) => {
                println!("received ping: {}", m);
                ch.send(Message::Pong(m.value));
            }
            _ => {
                println!("unexpected message: {:?}", m);
            }
        }
    }
}
```

Here, we introduce a mechanism called *channel*. It's an asynchronous, bi-directional, and bounded queue which enables message passing between processes. The `recv` method blocks until a message is received, and the `send` method sends a message to the other end of the channel.

In the above example, we assume that `ch` is connected to the client. How do we know the clients' channel? FTL's answer is *Autopilot*, a built-in declarative service orchestration mechanism inspired by Kubernetes and systemd.

```rs
pub fn main(env: Environ) {
    let autopilot_ch = env.autopilot_ch;
    loop {
        let m = ch.recv();
        match m {
            Message::NewClient(m) => {
                let client_ch = m.ch;
                loop {
                    let m = client_ch.recv();
                    match m {
                        Message::Ping(m) => {
                            println!("received ping: {}", m);
                            client_ch.send(Message::Pong(m.value));
                        }
                        _ => {
                            println!("unexpected message: {:?}", m);
                        }
                    }
                }                
            }
            _ => {
                println!("unexpected message: {:?}", m);
            }
        }
    }
}
```

Autopilot will automatically send a `NewClient` message containing a channel handle (aka. file descriptor) when a new client is connected. Also, `main` function now takes an `Environ` struct as an argument, which contains the execution environment information prepared by Autopilot.

The next headache is how to handle multiple clients. In the above example, we only handle one client at a time. Now, please welcome the `Mainloop` API:

```rs
pub fn main(env: Environ) {
    let mainloop = Mainloop::new();
    mainloop.add_channel(env.autopilot_ch);

    loop {
        let event = mainloop.next();
        match event {
            Event::Message(ch, Message::NewClient(m)) => {
                mainloop.add_channel(m.ch);
            }
            Event::Message(ch, Message::Ping(m)) => {
                println!("received ping: {}", m);
                m.ch.send(Message::Pong(m.value));
            }
            _ => {
                println!("unexpected event: {:?}", event);
            }
        }
    }
}
```

Looks better! `Mainloop` API allows us to handle multiple channels in an event-driven way. It's like a simplified version of `epoll` in Linux (in fact it's built on FTL's polling mechanism).

Lastly, what if we want to maintain some states for each client? In other words, let's make it stateful:

```rs
enum Context {
    Autopilot,
    Client { counter: i32 },
}

pub fn main(env: Environ) {
    let mainloop = Mainloop::new();
    mainloop.add_channel(env.autopilot_ch, Context::Autopilot);

    loop {
        let (ctx, event) = mainloop.next();
        match (ctx, event) {
            (Context::Autopilot, Event::Message(ch, Message::NewClient(m))) => {
                mainloop.add_channel(m.ch, Context::Client { counter: 0 });
            }
            (Context::Client { counter }, Event::Message(ch, Message::Ping(m))) => {
                println!("received ping: {} ({} times so far)", m, counter);
                *counter += 1;
                m.ch.send(Message::Pong(m.value));
            }
            _ => {
                println!("unexpected event: {:?}", event);
            }
        }
    }
}
```

Now `Mainloop` API manages a context, which can be updated in each event. It also allows us to distinguish different event sources and handle them differently. What if the `NewClient` message is sent from (untrusted) clients, not Autopilot? We should reject it, and now we can do it easily.

That's it! In practice, the actual API is slightly more complicated for good reasons (i.e. ownership/lifetime and error handling), but the overall structure is the same. Channel for IPC, Mainloop for the program flow, Context for state management, and Autopilot for service orchestration.
