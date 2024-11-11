---
title: "Rethinking microkernels: Towards a modern general-purpose OS"
date: 2024-11-11
layout: blog
lang: en
---

In 2024, I started creating a brand new microkernel-based operating system called [Starina](https://starina.dev). It aims to be a modern general-purpose OS that is performant, secure, and developer-friendly, for production use. In other words, the third option in open-source general-purpose OS world besides Linux and BSD family.

Starina is still in the early stage of development, but it's already taking good shape - [starina.dev](https://starina.dev) is served by **instantly-booted Starina VMs** running on Linux hypervisor (QEMU) on Raspberry Pi! Visit the website to say hi to Starina :)

In this blog post, I'd like to share my thoughts on microkernels and what I will give it a shot with Starina.

## Folklore: microkernels are slow

Microkernel is a kernel design where most of OS components (file systems, TCP/IP, device drivers, ...) are implemented as user-space processes, and the kernel provides only minimalistic features. It enables better fault isolation, better security, and better maintainability. All things aside, microkernel design is beautiful, cool, and elegant.

However, we don't see microkernel-based OS in general-purpose use today. Hybrid kernels like XNU (macOS) are the most microkernel-ish OS in the market. This is because, according to a folklore, microkernels are slow due to IPC overhead.

## Rethinking microkernels

It's 2024. [Ladybird](https://ladybird.org/) is trying to build a new web browser from scratch. We have Kubernetes for server management. Rust for safe systems programming. eBPF for kernel extensions. Our software stack is evolving rapidly. What if we build a microkernel-based OS with modern technologies? Why? Because it sounds fun! OS defines how you use your computer. OS creates its own computer world.

That said, how should we do differently from the past microkernel projects? Here are my thoughts:

### Productivity: Userspace-first approach

My observation is that microkernel projects tends to be kernel centric. To pursue the minimalistic and flexible kernel design, they push as many OS responsibilities to userspace as possible. This is nothing wrong, and is the essence of microkernel design.

 However, in general-purpose OS, I think we should not be too obsessed with it. As the kernel gets smaller, the userspace gets bigger. It means we will spend most of our time in userspace development. Even if the kernel is perfect, if userspace APIs/libraries are designed poorly, the overall reliability and performance will be poor.

 This is why I take the userspace-first approach in Starina, focusing on the userspace development experience. The first thing I did was to imagine "how do I want to develop userspace components in Starina?". In the userspace-first principle, the microkernel is not the center of the universe anymore. It is just a runtime behind the scenes.

 Let's say you want to learn Go programming language. Do you start with understanding the Go runtime? No, you would start with writing some applications in Go, and then dive into the runtime internals when you need to. The same goes for Starina. Start with writing applications, not microkernel internals.

 "Userspace-first" means the microkernel sometimes needs compromises to make userspace development easier. Make things work first, and then iterate to make it better. [Worse is better](https://www.dreamsongs.com/WIB.html).

### Performance: More isolation technologies

In traditional microkernel design, user-mode (so-called process isolation) is how to isolate OS components such as device drivers. Because function calls in monolithic kernels are replaced with inter-process communication (IPC) in microkernels, the overhead of IPC has been a critical performance issue.

Today, we have more technologies to isolate components. Rust provide memory safety with zero-cost (or pay-as-you-go) abstractions. WebAssembly is becoming a universal secure runtime for portable applications. New hardware features like Intel VT-x and Intel PKS provide hardware-assisted isolation.

In Starina, you can choose how to isolate components. The most exiciting one is Rust. It is less than user-mode isolation (`unsafe` can easily break the isolation), but enables a performant good-enough isolation.

Software-based isolation (WebAssembly/language VMs) is another interesting technology. What if you could implement a thread scheduler in JavaScript? OS development would be very approachable as if you were developing a web app!

### Security: OS development on the rails

As I mentioned earlier, microkernel is just a tiny part of the entire software stack. The security of the entire system is determined by the weakest link - it would be found - in the userspace. In other words, secure microkernel does not imply secure OS.

How can we make the userspace secure? My answer is, a good framework and APIs. In other words, good "convensions" that encourage secure programming practices that let you focus on what you actually want to do. It's like Ruby on Rails in Web development - every OS component looks similar, consistent, and easy to spot differences.

## What's next?

I'm finishing the core components of Starina, and starting to work on exciting features. The first focus is to deploy Starina on cloud environments such as AWS, Azure, and GCP. Here are the features I'm planning to work on next:

- **Finish basic OS features:** Timer, preemption, userspace page fault handling, and so on.
- **Polished developer tools:** Testing framework, easy-to-use build system, and most importantly, a good documentation.
- **Production readiness in cloud environments:** Built-in observability, handy deployment tools/integrations, and platform-specific support.
- **Better performance:** Demand paging, zero-copy message passing for bulk data transfer (for network packets and disk data).
- **Explore exciting technologies:** WebAssembly-based isolation, Linux compatibility/integration, porting device drivers from library OSes, ...

If you are interested in Starina, join the development on [GitHub](https://github.com/starina-os/starina)!
