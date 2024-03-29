import Image from "next/image";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
import LinkCard from "@/components/LinkCard";
import { Source_Sans_3 } from 'next/font/google'

const SourceSans3 = Source_Sans_3({ weight: ['400', '700'], style: ['normal', 'italic'], subsets: ['latin'], display: 'swap' })

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const MDXComponents = {
  LinkCard,
  // https://github.com/hashicorp/next-mdx-remote/issues/405#issuecomment-1755491272
  Image: (props) => <Image {...props} />,
};

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    metadataBase: new URL('https://seiya.me'),
    title: `${post.title} - seiya.me`,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: post.title,
      description: post.title,
      siteName: "seiya.me",
      type: "website",
      url: `https://seiya.me/blog/${post.slug}`,
      images: [
        {
          url: `https://seiya.me/api/og?slug=${post.slug}`,
          width: 1200,
          height: 600,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.title,
      card: "summary_large_image",
      creator: "@seiyanuta",
      images: [`https://seiya.me/api/og?slug=${post.slug}`],
    },
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main className="mx-auto max-w-2xl w-full py-8 px-4">
      <NavBar breadcrumb={[{ title: "blog", "dest": "/blog" }]} />
      <article className={`prose lg:prose-wider dark:prose-invert prose-neutral text-lg max-w-full ${SourceSans3.className}`}>
        <div className="mt-16 mb-6 text-center ">
          <h1 className="mb-1 text-3xl font-bold dark:text-slate-200">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
        <div>
          {/* @ts-ignore RSC may return Promise<Element> */}
          <MDXContent components={MDXComponents} />
        </div>
      </article>
      <div className="lg:mt-16 mt-8 mb-16">
        <BottomBar />
      </div>
    </main>
  );
}
