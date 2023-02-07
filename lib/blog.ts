import { allPosts, Post } from "contentlayer/generated";

export function getAllSlugs(): string[] {
  return allPosts.map((post) => post._raw.flattenedPath);
}

export function getPostByTitle(title: string): Post {
  const post = allPosts.find((post) => post.title === title);
  if (!post) {
    throw new Error(`Post with title "${title}" not found`);
  }

  return post;
}

export function getPostBySlug(slug: string): Post {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  return post;
}
