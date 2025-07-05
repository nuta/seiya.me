import fs from "node:fs/promises";
import path from "node:path";
import { JSX } from "react";
import crypto from "node:crypto";
import { renderMDX } from "./mdx";

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
};

export type Scope = {};

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
  return Object.values(posts).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

let cachedPosts: Map<Slug, { hash: string; post: BlogPost }> = new Map();

export class PostNotFoundError extends Error {
  constructor(slug: Slug) {
    super(`Blog post ${slug} not found`);
  }
}

export async function getBlogPostBySlug(slug: Slug): Promise<BlogPost> {
  const mdxPath = path.join(process.cwd(), "blog", `${slug}.mdx`);

  let source: string;
  try {
    source = await fs.readFile(mdxPath, "utf-8");
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      throw new PostNotFoundError(slug);
    }

    throw new Error(`Error reading blog post ${mdxPath}: ${err}`);
  }

  const hash = crypto.createHash("sha256").update(source).digest("hex");
  const cached = cachedPosts.get(slug);
  if (cached && cached.hash === hash) {
    return cached.post;
  }

  const rendered = await renderMDX(source);
  const post = {
    slug,
    frontmatter: rendered.frontmatter,
    mdx: rendered.content,
    scope: rendered.scope,
  };
  cachedPosts.set(slug, { hash, post });
  return post;
}
