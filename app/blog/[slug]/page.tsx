import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import type { Metadata } from 'next';


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
    return {
        title: post.frontmatter.title,
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const post = await getBlogPostBySlug((await params).slug);
    return (
        <div>
            <h1>{post.frontmatter.title}</h1>
            {post.mdx}
        </div>
    )
}
