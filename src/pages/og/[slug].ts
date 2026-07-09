import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { renderOgImage } from "@/lib/og-image";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<"blog">;
  const png = await renderOgImage(post.data.title, post.id);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
