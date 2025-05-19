import { getSortedBlogPosts } from "@/lib/blog";
import { toDateString } from "@/lib/date";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { FaRssSquare } from "react-icons/fa";

export default async function BlogIndex() {
  const posts = await getSortedBlogPosts();

  return (
    <>
      <NavBar />
      <header className="mb-12">
        <h1 className="text-2xl font-bold">
          Blog
          <span className="text-xl text-gray-700 ml-4">
            <Link href="/atom.xml" prefetch={false}>
              <FaRssSquare className="inline-block mr-1 text-orange-500" />
              feed
            </Link>
          </span>
        </h1>
      </header>
      <ul className="list-none">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="mb-1 mb-4 flex flex-col md:flex-row md:items-end"
          >
            <span className="text-sm gray-text mr-3 tabular-nums w-[100px] md:text-right">
              {toDateString(post.frontmatter.date)}
            </span>
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
