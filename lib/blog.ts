import fs from "node:fs/promises";
import path from "node:path";
import { evaluate } from "next-mdx-remote-client/rsc";
import { JSX } from "react";
import rehypePrettyCode from "rehype-pretty-code";

export type Slug = string;

export interface BlogPost {
    slug: Slug;
    frontmatter: Frontmatter;
    mdx: JSX.Element;
    scope: Scope;
}

export type Frontmatter = {
    title: string;
    date: string;
}

export type Scope = {
}

let cachedPosts: Record<Slug, BlogPost> | null = null;    

export async function getBlogPosts(): Promise<Record<Slug, BlogPost>> {
    if (!cachedPosts) {
        cachedPosts = await doGetBlogPosts();
    }

    return cachedPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const posts = await getBlogPosts();
    const post = posts[slug];
    if (!post) {
        throw new Error(`Blog post ${slug} not found`);
    }

    return post;
}

async function doGetBlogPosts(): Promise<Record<Slug, BlogPost>> {
    const files = await fs.readdir(path.join(process.cwd(), "blog"));
    const posts: Record<Slug, BlogPost> = {};
    for (const file of files) {
        const source = await fs.readFile(path.join(process.cwd(), "blog", file), "utf-8");
        if (!file.endsWith(".mdx") && !file.endsWith(".md")) {
            continue;
        }

        const { content, frontmatter, scope, error } = await evaluate<Frontmatter, Scope>({
            source,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        [rehypePrettyCode, {
                            theme: "github-dark",
                        }]
                    ]
                }
            },
            components: {},
          });

          if (error) {
            throw new Error(`Error evaluating blog post ${file}: ${error}`);
          }
        
        const slug = file.replace(/\..*$/, "");
        posts[slug] = {
            slug,
            frontmatter,
            mdx: content,
            scope
        };
    }

    return posts;
}