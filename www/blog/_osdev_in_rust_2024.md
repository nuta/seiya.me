---
title: How OS development in Rust is like (Nov 2024)
date: 2024-11-11
layout: blog
lang: en
---

This article is for time travers from 2020 who wants to know how OS development in Rust become nicer in 2024.

## Stable Rust is almost there

TODO: Thanks to Linux stable rust movement

```
$ rg -F '#![feature('
kernel/lib.rs
2:#![feature(naked_functions)]
3:#![feature(arbitrary_self_types)]

libs/rust/starina_api/lib.rs
41:#![feature(start)]
```

## Rust's inline assembly is just awesome

## `&raw` syntax

```diff
-    let bss_start = &__bss as *const _ as usize;
+    let bss_start = &raw const __bss as usize;
```

## Const generics

## Major crates are getting `no_std` support

- serde
- rustls
