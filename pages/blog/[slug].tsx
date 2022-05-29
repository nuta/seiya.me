import { useMDXComponent } from 'next-contentlayer/hooks';
import { GetStaticProps } from 'next';
import { allPosts } from 'contentlayer/generated';
import type { Post } from 'contentlayer/generated';
import styles from './[slug].module.scss';
import BlogLayout from 'components/layouts/BlogLayout';
import Image from 'next/image';

const components = {
    Image,
};

export default function Post({ post }: { post: Post }) {
    const Body = useMDXComponent(post.body.code);
    return (
        <BlogLayout meta={{ title: `${post.title} - seiya.me` }}>
            <div className={styles.title}>
                <h1>{post.title}</h1>
                <div className={styles.meta}>
                    {post.date}
                </div>
            </div>

            <Body components={components} />
        </BlogLayout >
    )
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
    const post = allPosts.find((post) => post.slug === params.slug);
    return { props: { post } };
}

export async function getStaticPaths() {
    return {
        paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
        fallback: false
    };
}
