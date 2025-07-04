import NavBar from "@/app/components/NavBar";
import {
  getBlogPostBySlug,
  type BlogPost,
  getBlogPosts,
  PostNotFoundError,
} from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface FrontMatter {
  title: string;
  date: string;
}

export async function generateStaticParams(): Promise<
  { params: { slug: string } }[]
> {
  const posts = await getBlogPosts();
  return Object.keys(posts).map((slug) => ({
    params: { slug },
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  let post: BlogPost;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (err) {
    if (err instanceof PostNotFoundError) {
      notFound();
    }
    throw err;
  }

  const ogImageUrl = `https://seiya.me/og/${slug}`;

  return {
    title: post.frontmatter.title,
    openGraph: {
      title: post.frontmatter.title,
      type: "article",
      url: `https://seiya.me/blog/${slug}`,
      siteName: "seiya.me",
      publishedTime: post.frontmatter.date,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.title,
      creator: "@seiyanuta",
      images: [
        {
          url: ogImageUrl,
          alt: post.frontmatter.title,
        },
      ],
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let post: BlogPost;
  try {
    post = await getBlogPostBySlug((await params).slug);
  } catch (err) {
    if (err instanceof PostNotFoundError) {
      notFound();
    }
    throw err;
  }

  return (
    <article>
      <NavBar />
      <header className="mb-8">
        <h1 className="text-2xl font-sans font-bold">
          {post.frontmatter.title}
        </h1>
        <p className="text-sm gray-text mt-2">{post.frontmatter.date}</p>
      </header>
      <div className="font-[PT Serif]">{post.mdx}</div>
      <footer className="text-center mt-12 mb-8">
        &mdash; <br />
        Written by <Link href="/">Seiya Nuta</Link>
        <br />
        CC BY 4.0
      </footer>
    </article>
  );
}
