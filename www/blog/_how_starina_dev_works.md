---
title: How starina.dev works
date: 2024-11-11
layout: blog
lang: en
---

Have you visited [starina.dev](https://starina.dev)? It's served by my new microkernel-based OS called [Starina](https://starina.dev) written from scratch. However, the technology behind the website is something you might not expect - your every single HTTP request is served by a dedicated Starina VM freshly booted on a Linux hypervisor!

## Architecture

[starina.dev](https://starina.dev) is hosted on a single Raspberry Pi 5 machine running Ubuntu 24.04. It is managed by [Kamal](https://kamal-deploy.org/), and runs an HTTP server called `vmcgi` in Docker.

## `vmcgi` - VM-based CGI-ish reverse proxy

Back in 2000s, we had a technology called CGI (Common Gateway Interface) that allows a web server to provide dynamic contents. Each time a request comes in, the server spawns a new process to let the program do its job, and generates a response. We don't use CGI today and instead we run applications as a long-running process for resource efficiency and performance.

`vmcgi`, the tiny reverse proxy written for [starina.dev](https://starina.dev), revives the CGI spirit but with strong isolation. When a request comes in, `vmcgi` boots a new Starina VM on KVM-accelerated QEMU hypervisor, and forwards the request to the Starina's HTTP server.

If you're familiar with hypervisors, you might wonder why I don't use Firecracker, another KVM-based hypervisor designed for lightweight VMs. This is because:

- QEMU has great debugging features that help me to quickly diagnose issues.
- QEMU provides user networking with port forwarding, which simplifies the setup. Firecracker requires a TAP device and separate network setup.
- QEMU works perfectly on macOS, which is my primary development environment. It also supports KVM-like hardware acceleration!

## Signs of `vmcgi` in action

You can see some signs of `vmcgi` in the HTTP response headers:

```
$ curl -sI https://starina.dev | egrep 'vmcgi-|x-powered-by'
vmcgi-status: OK
vmcgi-vm-boot-time: 100 ms (hardware acceleration enabled)
x-powered-by: Starina
```

`vmcgi-status` tells you if `vmcgi` is working properly, and `vmcgi-vm-boot-time` shows how long it took until Starina finished booting. The boot time includes QEMU startup, Starina kernel boot, and userspace initialization.

## Performance

On my Raspberry Pi 5, it takes around 100 ms to boot. QEMU startup takes around 60 ms, and therefore Starina takes around 40 ms to boot.

40 ms might sound pretty fast in Linux, but actually Starina is still doing naive and slow initialization - my goal is to make it boot in less than 10 ms.

## You don't need `vmcgi`

While `vmcgi` provides strong isolation to restrict what the web server can do, you wouldn't need it if you can trust what you run. I wrote `vmcgi` because Starina is not yet mature (it does not have even SSH server!).

My ultimate goal is running Starina directly on Raspbery Pi 5, with good observability and good automated deployment mechanism similar to Kubernetes.
