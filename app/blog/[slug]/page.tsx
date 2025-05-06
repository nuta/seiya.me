import Navbar from "@/app/components/navbar";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import type { Metadata } from 'next';
import Link from "next/link";
import { notFound } from "next/navigation";


export interface FrontMatter {
    title: string;
    date: string;
}

export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
    const posts = await getBlogPosts();
    return Object.keys(posts).map((slug) => ({
        params: { slug },
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    // No need to await params, they are passed directly
    const post = await getBlogPostBySlug((await params).slug);
    if (!post) {
        notFound();
    }

    return {
        title: post.frontmatter.title,
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const post = await getBlogPostBySlug((await params).slug);
    if (!post) {
        notFound();
    }

    return (
        <article>
            <Navbar />
            <header className="mb-12">
                <h1 className="text-2xl font-bold">{post.frontmatter.title}</h1>
                <p className="text-sm text-gray-500 mt-2">
                    {post.frontmatter.date}
                </p>
            </header>
            <div className="prose prose-neutral lg:prose-lg">
                {post.mdx}
            </div>
            <footer className="text-center mt-12 mb-8">
            &mdash; <br />
            Written by <Link href="/">Seiya Nuta</Link>
            <br />
            CC BY 4.0
            </footer>
        </article>
    )
}
