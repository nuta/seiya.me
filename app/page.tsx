import Image from "next/image";
import MyPicture from "./me.jpg";
import Link from "next/link";
import "./home.css";
import { getBlogPosts } from "@/lib/blog";

function toDateString(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function Home() {
  const posts = Object.values(await getBlogPosts()).sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return (
    <div className="font-sans">
      <header className="flex flex-row items-center">
        <div>
          <Image src={MyPicture} alt="selfie" className="rounded max-w-24" />
        </div>
        <div className="ml-5 py-1 flex flex-col justify-between self-stretch">
          <div>
            <h1 className="text-2xl font-bold">Seiya Nuta</h1>
            <p>
              An operating system kernel enthusiast.
            </p>
          </div>
          <p className="my-2 font-mono text-sm select-all">
            nuta@<span className="hidden">invisible in real browsers</span>seiya.me
          </p>
          <nav className="flex flex-row gap-4">
            <Link href="https://github.com/nuta" prefetch={false}>GitHub</Link>
            <Link href="https://www.linkedin.com/in/seiyanuta/" prefetch={false}>LinkedIn</Link>
          </nav>
        </div>
      </header>
      <main className="my-12">
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-bold">Projects</h2>
          <ul className="space-y-2">
            <li>
              <Link href="https://github.com/starina-os/starina" prefetch={false}>Starina</Link>
              : A modern general-purpose microkernel-based operating system written in Rust.
            </li>
            <li>
              <Link href="https://github.com/nuta/kerla" prefetch={false}>Kerla</Link>
              : A Linux ABI-compatible kernel written in Rust.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-2xl font-bold">Publications</h2>
          <ul className="space-y-2">
            <li>
              <Link href="https://github.com/nuta/microkernel-book" prefetch={false}>Design and Implementation of Microkernels</Link>
              : A comprehensive guide that delves into the world of microkernels including real-world microkernels (seL4, MINIX3, and Mach), and
              a minimalistic educational microkernel (<Link href="https://github.com/nuta/microkernel-book" prefetch={false}>HinaOS</Link>).
            </li>
            <li>
              <Link href="https://github.com/nuta/operating-system-in-1000-lines" prefetch={false}>Writing an Operating System in 1,000 Lines</Link>
              : A beginner's guide to implement context switching, paging, system calls, user mode, virtio-blk driver, file system, and shell in 1,000 lines of C.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-2xl font-bold">Posts</h2>
          <ul className="list-none space-y-2">
            {posts.map((post) => (
              <li key={post.slug} className="mb-1 flex flex-col md:flex-row md:items-end">
                <span className="text-sm text-gray-700 mr-3 tabular-nums w-[100px] md:text-right">
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
