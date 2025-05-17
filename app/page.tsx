import Image from "next/image";
import MyPicture from "./me.jpg";
import Link from "next/link";
import { FaRssSquare } from "react-icons/fa";
import "./home.css";
import { getSortedBlogPosts } from "@/lib/blog";
import { toDateString } from "@/lib/date";

export default async function Home() {
  const posts = await getSortedBlogPosts();
  return (
    <div className="font-sans">
      <header className="flex flex-row items-center">
        <div>
          <Image src={MyPicture} alt="selfie" className="rounded max-w-24" />
        </div>
        <div className="ml-5 py-1 flex flex-col justify-between self-stretch">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Seiya Nuta</h1>
          </div>
          <p className="my-2 font-mono text-base select-all">
            nuta
            <span className="hidden">invisible in real browsers</span>
            <span className="px-[1px]">@</span>
            seiya.me
          </p>
          <nav className="flex flex-row gap-4">
            <Link href="/blog">Blog</Link>
            <Link href="https://github.com/nuta" prefetch={false}>GitHub</Link>
            <Link href="https://www.linkedin.com/in/seiyanuta/" prefetch={false}>LinkedIn</Link>
          </nav>
        </div>
      </header>
      <main className="my-12">
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-bold">Projects</h2>
          <ul className="space-y-4">
            <li>
              <Link href="https://github.com/starina-os/starina" prefetch={false} className="font-bold">Starina</Link>
              : A modern, general-purpose, and microkernel-based operating system.
            </li>
            <li>
              <Link href="https://github.com/nuta/kerla" prefetch={false} className="font-bold">Kerla</Link>
              : A Linux ABI-compatible kernel written in Rust. It supports fork/execve, signals, mmap, pipe, poll, tty/pty, tmpfs, UDP/TCP sockets, and more to <Link href="/blog/writing-linux-clone-in-rust" prefetch={false}>run Dropbear SSH server</Link>.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-2xl font-bold">Publications</h2>
          <ul className="space-y-4">
            <li>
              <Link href="https://github.com/nuta/microkernel-book" prefetch={false} className="font-bold">Design and Implementation of Microkernels</Link>
              : A comprehensive guide that delves into the world of microkernels including real-world microkernels (seL4, MINIX3, and Mach), and
              a minimalistic educational microkernel (<Link href="https://github.com/nuta/microkernel-book" prefetch={false}>HinaOS</Link>).
            </li>
            <li>
              <Link href="https://github.com/nuta/operating-system-in-1000-lines" prefetch={false} className="font-bold">Writing an Operating System in 1,000 Lines</Link>
              : A beginner's guide to implement context switching, paging, system calls, user mode, virtio-blk driver, file system, and shell in 1,000 lines of C.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-2xl font-bold">
            Blog
            <span className="text-base gray-text ml-2">
              <Link href="/atom.xml" prefetch={false}>
                <FaRssSquare className="inline-block mr-1 text-orange-500" />
                feed
              </Link>
            </span>
          </h2>
          <ul className="list-none">
            {posts.map((post) => (
              <li key={post.slug} className="mb-1 flex flex-col md:flex-row md:items-end">
                <span className="text-sm gray-text mr-3 tabular-nums w-[100px] md:text-right">
                  {toDateString(post.frontmatter.date)}
                </span>
                <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
