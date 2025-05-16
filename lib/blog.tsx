
import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { evaluate } from "next-mdx-remote-client/rsc";
import { JSX } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import Image from "next/image";
import sizeOf from "image-size";
import crypto from "node:crypto";

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
    lang?: string;
}

export type Scope = {
}

async function getPostSlugs(): Promise<Slug[]> {
    const filenames = await fs.readdir(path.join(process.cwd(), "blog"));
    const slugs: Slug[] = [];
    for (const filename of filenames) {
        if (filename.endsWith(".mdx") || filename.endsWith(".md")) {
            slugs.push(path.basename(filename, path.extname(filename)));
        }
    }

    return slugs;
}

export async function getBlogPosts(): Promise<Record<Slug, BlogPost>> {
    const slugs = await getPostSlugs();
    const posts: Record<Slug, BlogPost> = {};
    for (const slug of slugs) {
        posts[slug] = await getBlogPostBySlug(slug);
    }
    return posts;
}

export async function getSortedBlogPosts(): Promise<BlogPost[]> {
    const posts = await getBlogPosts();
    return Object.values(posts).sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

let cachedPosts: Map<Slug, { hash: string, post: BlogPost }> = new Map();

export async function getBlogPostBySlug(slug: Slug): Promise<BlogPost> {
    const mdxPath = path.join(process.cwd(), "blog", `${slug}.mdx`);
    const source = await fs.readFile(mdxPath, "utf-8");
    const hash = crypto.createHash("sha256").update(source).digest("hex");

    const cached = cachedPosts.get(slug);
    if (cached && cached.hash === hash) {
        return cached.post;
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
        components: {
            img: (props) => {
                if (!props.src.startsWith("/")) {
                    throw new Error(`Image src must start with /: ${props.src}`);
                }

                const imagePath = path.join(process.cwd(), "public", props.src);
                const image = readFileSync(imagePath);

                let size;
                try {
                    size = sizeOf(image);
                } catch (e) {
                    throw new Error(`Error getting image size for ${props.src}: ${e}`);
                }

                return <Image src={`${props.src}`} alt={props.alt} width={size.width} height={size.height} />;
            },
        },
    });

    if (error) {
        throw new Error(`Error evaluating blog post ${mdxPath}: ${error}`);
    }

    const post = {
        slug,
        frontmatter,
        mdx: content,
        scope
    };
    cachedPosts.set(slug, { hash, post });
    return post;
}
