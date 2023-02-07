import { getPost } from "@/lib/blog";

export default function Head({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug);
      return (
      <>
        <title>{post.title + ' - seiya.me'}</title>
      </>
    )
  }
  