import fs from "node:fs/promises";
import path from "node:path";
import { getFrontmatter } from "next-mdx-remote-client/utils";

export interface BlogPost {
    title: string;
    date: string;
    slug: string;
    mdx: string;
}

let cachedPosts: BlogPost[] | null = null;    

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!cachedPosts) {
        cachedPosts = await doGetBlogPosts();
    }

    return cachedPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const posts = await getBlogPosts();
    const post = posts.find((post) => post.slug === slug);
    if (!post) {
        throw new Error(`Blog post ${slug} not found`);
    }

    return post;
}

async function doGetBlogPosts(): Promise<BlogPost[]> {
    const files = await fs.readdir(path.join(process.cwd(), "blog"));
    const posts: BlogPost[] = [];
    for (const file of files) {
        const content = await fs.readFile(path.join(process.cwd(), "blog", file), "utf-8");
        if (!file.endsWith(".mdx") && !file.endsWith(".md")) {
            continue;
        }

        const { frontmatter, strippedSource } = await getFrontmatter(content);

        if (typeof frontmatter.title !== "string") {
            throw new Error(`Blog post ${file} has no title`);
        }

        if (typeof frontmatter.date !== "string") {
            throw new Error(`Blog post ${file} has no date`);
        }

        posts.push({
            title: frontmatter.title,
            date: frontmatter.date,
            slug: file.replace(".mdx", "").replace(".md", ""),
            mdx: strippedSource,
        });
    }

    return posts;
}