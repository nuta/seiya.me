import type { APIRoute } from "astro";
import { Feed } from "feed";
import { getSortedPosts } from "@/lib/posts";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getSortedPosts();

  const feed = new Feed({
    title: "seiya.me",
    id: "https://seiya.me",
    link: "https://seiya.me",
    copyright: "Seiya Nuta",
    author: {
      name: "Seiya Nuta",
    },
  });

  // Feed items are expected oldest first.
  for (const post of [...posts].reverse()) {
    feed.addItem({
      title: post.data.title,
      link: `https://seiya.me/blog/${post.id}`,
      date: post.data.date,
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
