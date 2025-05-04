import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import type { Metadata } from 'next';

export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        params: { slug: post.slug },
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    // No need to await params, they are passed directly
    const post = await getBlogPostBySlug((await params).slug);
    return {
        title: post.title,
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const post = await getBlogPostBySlug((await params).slug);
    return (
        <div>
            <h1>{post.title}</h1>
            {/* Consider adding components prop if you have custom components */}
            {/* import { useMDXComponents } from '@/mdx-components'; */}
            {/* const components = useMDXComponents({}); */}
            <MDXRemote source={post.mdx} /* components={components} */ />
        </div>
    )
}
