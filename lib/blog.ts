import { allPosts, Post } from "contentlayer/generated";

export function getAllSlugs(): string[] {
  return allPosts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post {
  const post = allPosts.find((post) => post.slug === slug);
  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  return post;
}
