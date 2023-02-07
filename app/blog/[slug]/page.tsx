import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { getAllSlugs, getPost } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const MDXComponents = {
  Image,
};

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <article className="mx-auto max-w-2xl py-16">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-center text-sm font-bold uppercase text-blue-700"
          >
            Home
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-slate-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
        <MDXContent components={MDXComponents} />
      </article>
    </>
  );
}
