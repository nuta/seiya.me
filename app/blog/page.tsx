import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";

function PostCard(post: Post) {
  return (
    <div className="mb-6">
      <time dateTime={post.date} className="block text-sm text-slate-600 dark:text-slate-300">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <h2 className="text-lg">
        <Link
          prefetch={false}
          className="dark:text-sky-400 hover:text-sky-600"
          href={post.url}
        >
          {post.title}
        </Link>
      </h2>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
