import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "@/lib/og-image";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({ params: { slug: post.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!;
  const posts = await getCollection("blog");
  const post = posts.find((p) => p.id === slug);
  if (!post) {
    return new Response("not found", { status: 404 });
  }

  const png = await renderOgImage(post.data.title, slug);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
