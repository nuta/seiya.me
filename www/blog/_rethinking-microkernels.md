---
title: Rethinking microkernels towards a modern general-purpose OS
date: 2024-09-21
layout: blog
lang: en
---

I have been working on a new microkernel-based OS called **[Stelana](https://stelana.org)**. The goal is not a hobby OS, but a general-purpose production-ready OS like Linux and FreeBSD. It's still in the early stages, but it's already taking good shape - The [website](https://stelana.org) is served by Stelana on Linux QEMU!

If you know microkernels, you might think it's a crazy idea. Microkernel is a very cool technology, but it is also known for their poor performance, poor feature set, and poor usability. However, it's 2024. Things have changed a lot. Containerized deployments managed by Kubernetes. Microservices everywhere. Web browsers now run C/Rust code in WebAssembly. Monolithic kernels desire to be more dynamic with eBPF. Our software stack has been evolving rapidly! ... but where are microkernels?

It's time to try building a new cool general-purpose microkernel OS, with modern technologies. Why? Of course, just for fun! OS defines how you use your computer, or creates a world. It's not only building an alternative, but also rediscovering how UNIX and Windows are nicely designed. Let's satisfy our curiosity!

That being said, what should we do differently from the past microkernels? Let me share my thoughts:

## Productivity: userspace-first development

My observation on modern microkernels is that they are kernel-centric. To pursue the minimalistic, policy-free, and beautiful design, they push as much as possible into userspace. This is generally a good idea, but in general-purpose OS, I think we should not be too obsessed with it.

Why? Because as the responsibilities of the kernel are reduced, the user space becomes larger. In other words, you will spend most of your time in userspace. Even if the microkernel is beautiful and secure, if API is poorly designed, its reliability and development velocity will be poor.

This is why I take the userspace-first approach. OS development should be fun! To make it fun, we need a good developer experience: intuitive APIs, a handy toolchain, and a good documentation. In the userspace-first principle, the microkernel is not the center of the universe anymore. It is the behind-the-scenes support to make userspace components shine.

This means the microkernel sometimes needs compromises to make userspace development easier. Make things work first, and then iterate to make it better. [Worse is better](https://www.dreamsongs.com/WIB.html).

## Performance: process is just one of many isolation mechanisms

In the traditional microkernel design, *"process"* is how it isolates components. It was the main reason why microkernels were slow: inter-process communication (IPC) is much slower than function calls.

In 2024, we have many more isolation mechanisms. The most promising one is language-based isolation, especially Rust. It is less secure than process isolation (`unsafe` can break the isolation), but enables a performant *good-enough* isolation. With language-based isolation, IPC could be optimized to be nearly as fast as indirect function calls.

Another promising isolation mechanism would be WebAssembly. Inevitably it's slower than the native code, but it's more secure than language-based isolation, and faster than process-based isolation. What if you could implement process scheduler in JavaScript? OS development can be like Web development!

## Security: Microkernel design does not mean it's secure

As I mentioned earlier, microkernel is just a tiny part of the entire software stack. The design of userspace components is as important as the microkernel design.

How can we make userspace components secure? My answer is to provide a good userspace framework and APIs. In other words, "conventions" that promote secure coding practices let you focus on what you actually want to implement. It's like Ruby on Rails for OS - every OS component looks similar, consistent, and easy to spot something weird.

## Stelana - A modern general-purpose microkernel OS

**Stelana** *(STE-LLA-NA - "stellar" + "-na")* is

- A new microkernel written in Rust (single kernel stack design)
- Easy-to-use intuitive Rust API
- Declarative userspace management (like systemd/Kubernetes)
- Kernel/userspace hybrid apps

## Rust + GC-based languages

I chose Rust as the primary programming language for Stelana. Rust enforces me to design a good API, for example, *"who owns this object?"*, *"does this operation need a mutable reference?"*, *"where should I decrement the reference counter?"*, *"where should I acquire a lock?"*, and so on. If I'm doing something wrong, the compiler tells me that it won't work. For me, Rust is C++ with safety belts.

Rust is a well-designed programming language, but it also introduces a steep learning curve to do things correctly. Async Rust is a good example of this. It's very carefully designed, but is hard by nature. This is why Stelana apps are written in a straightforward event loop + async APIs style (no `async fn`s). I intentionally avoid using such advanced language features. It allows newbies to use Rust as a scripting-ish language with an ergnomic developer experience.

In the near future, I plan to add a support for GC-based languages like JavaScript for building OS components. They are approachable for beginners, provide memory safety, and would be fast enough for non-critical components.
