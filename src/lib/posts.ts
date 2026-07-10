import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPosts(): Promise<{
  englishPosts: Post[];
  japanesePosts: Post[];
}> {
  const posts = await getSortedPosts();
  const japanesePosts = posts.filter((post) => post.data.lang === "ja");
  const englishPosts = posts.filter((post) => post.data.lang !== "ja");
  return { englishPosts, japanesePosts };
}
