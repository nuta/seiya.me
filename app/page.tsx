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
    <div className="font-['Times']">
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
          <nav className="flex flex-row gap-4">
            <Link href="https://github.com/nuta" prefetch={false}>GitHub</Link>
            <Link href="https://twitter.com/seiyanuta" prefetch={false}>Twitter</Link>
            <Link href="https://www.linkedin.com/in/seiyanuta/" prefetch={false}>LinkedIn</Link>
          </nav>
        </div>
      </header>
      <main className="my-12">
        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-bold">Projects</h2>
          <ul>
            <li>
              <Link href="https://github.com/starina-os/starina" prefetch={false}>Starina operating system</Link>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-bold">Publications</h2>
          <ul>
            <li>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-2 text-2xl font-bold">Posts</h2>
          <ul className="list-none">
            {posts.map((post) => (
              <li key={post.slug} className="mb-1 flex flex-col md:flex-row">
                <span className="text-sm text-gray-700 mr-2 tabular-nums">
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
