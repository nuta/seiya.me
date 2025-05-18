import NavBar from "@/app/components/NavBar";
import { getBlogPostBySlug, type BlogPost, getBlogPosts } from "@/lib/blog";
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
    const slug = (await params).slug;
    const post = await getBlogPostBySlug((await params).slug);
    if (!post) {
        notFound();
    }

    const ogImageUrl = `https://seiya.me/og/${slug}`;

    return {
        title: post.frontmatter.title,
        openGraph: {
            title: post.frontmatter.title,
            type: 'article',
            publishedTime: post.frontmatter.date,
            images: [{
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: post.frontmatter.title,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.frontmatter.title,
            images: [ogImageUrl],
        },
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    let post: BlogPost;
    try {
        post = await getBlogPostBySlug((await params).slug);
    } catch (err) {
        if (err instanceof Error && (err as any).code === "ENOENT") {
            notFound();
        }
        throw err;
    }

    return (
        <article>
            <NavBar />
            <header className="mb-8">
                <h1 className="text-2xl font-sans font-bold">{post.frontmatter.title}</h1>
                <p className="text-sm gray-text mt-2">
                    {post.frontmatter.date}
                </p>
            </header>
            <div className="font-[PT Serif]">
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
