import { getPostBySlug } from "@/lib/blog";

export default function Head({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  return (
    <>
      <title>{post.title + " - seiya.me"}</title>
      <meta
        property="og:url"
        content={`https://seiya.me/blog/${params.slug}`}
      />
      <meta property="og:title" content={post.title} />
      <meta property="og:site_name" content="seiya.me" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`https://seiya.me/api/og?title=${post.title}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@seiyanuta" />
      <meta name="twitter:creator" content="@seiyanuta" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
