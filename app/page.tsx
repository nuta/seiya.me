import Email from "@/components/Email";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Seiya Nuta",
}

export default function Index() {
  return (
    <div className="px-6">
      <Head>
        <title>Seiya Nuta</title>
      </Head>

      <main className="container max-w-2xl mx-auto py-16 leading-7">
        <header className="text-center">
          <Image className="mx-auto rounded-3xl" src="/me.jpg" height="112" width="100" alt="me" />
          <div className="mt-6">
            <h1 className="text-lg font-bold">
              <span className="inline-block text-3xl select-all">Seiya Nuta</span>
              <br />
              <span className="inline-block text-lg py-1">(<span className="select-all">怒田 晟也</span>)</span>
            </h1>
            <div className="py-5">An operating system kernel enthusiast.</div>
            <div>
              <span>
                <a href="blog">Blog</a>
              </span>
              <span>
                &nbsp;・&nbsp;
                <a href="https://twitter.com/seiyanuta">Twitter</a>
              </span>
              <span>
                &nbsp;・&nbsp;<a href="https://github.com/nuta">GitHub</a>
              </span>
              <span>
                &nbsp;・&nbsp;
                <a href="https://www.linkedin.com/in/seiyanuta">LinkedIn</a>
              </span>
              <br />
              <p className="py-4 font-mono tracking-wider select-all">
                <Email />
              </p>
            </div>
          </div>
        </header>

        <section className="mt-4">
          <h1 className="text-xl font-bold">Publications</h1>
          <ul className="list-disc mt-4 pl-4">
            <li className="mt-4">
              <a className="font-bold italic" href="https://www.hanmoto.com/bd/isbn/9784798068718">
                &ldquo;Design and Implementation of Microkernels&rdquo;
              </a>
              &nbsp;-&nbsp;
              A comprehensive guide that delves into the world of microkernels
              including real-world microkernels like seL4, MINIX3, and Mach,
              as well as an educational microkernel-based OS
              (<a href="https://github.com/nuta/microkernel-book">HinaOS</a>).
              It covers concepts of operating systems,
              how microkernels make them happen,
              and recent intriguing research topics.
              Written in Japanese.
            </li>
          </ul>
        </section>

        <section className="mt-6">
          <h1 className="text-xl font-bold">Projects</h1>
          <ul className="list-disc mt-4 pl-4">
            <li className="mt-4">
              <a className="font-bold" href="https://github.com/nuta/resea">Resea</a>&nbsp;-&nbsp;
              A minimalistic and policy-free microkernel based operating
              system written from scratch, with TCP/IP, FAT file system,
              hardware-accelerated hypervisor, and x86_64 / 64-bit ARM
              support. I began this open source software project to develop a
              developer-friendly alternative to MINIX and L4.
            </li>
            <li className="mt-4">
              <a className="font-bold" href="https://github.com/nuta/kerla">Kerla</a>&nbsp;-&nbsp;
              A monolithic kernel with Linux binary compatibility written from
              scratch in Rust. I&apos;ve implemented basic kernel features like
              fork/execve, signals, mmap, pipe, poll, tty/pty,
              tmpfs, UDP/TCP sockets, etc. You can try it on an ephemeral demo
              microVM running Kerla: <code className="bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded-md select-all ">ssh&nbsp;root@demo.kerla.dev</code>
            </li>
            <li className="mt-4">
              <a className="font-bold" href="https://github.com/nuta/nsh">nsh</a>&nbsp;-&nbsp;
              A almost-POSIX-compliant command-line shell written in Rust
              featuring out-of-the-box features just like fish shell. It aims
              to be drop-in replacement for Bash as an interactive shell.
            </li>
          </ul>
        </section>

        <section className="mt-6">
          <h1 className="text-xl font-bold">Experience</h1>
          <ul className="list-disc mt-4 pl-4">
            <li className="mt-3">
              <a href="https://summerofcode.withgoogle.com/archive/2019/projects/5871651231629312/">
                Google Summer of Code 2019 student (LLVM Project)
              </a>
            </li>
            <li className="mt-3">
              <a href="https://web.archive.org/web/20220624224917/https://www.meti.go.jp/english/press/2017/0530_001.html">
                MITOU Program 2016 (Super Creator Award)
              </a>
            </li>
            <li className="mt-3">
              <a href="https://www.google-melange.com/archive/gsoc/2014/orgs/freebsd/projects/seiya.html">
                Google Summer of Code 2014 student (FreeBSD Project)
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div >
  );
}
