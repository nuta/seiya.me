import { allPosts } from 'contentlayer/generated';
import BlogLayout from 'components/layouts/BlogLayout';
import styles from './index.module.scss';
import Link from 'next/link';

export default function PostsIndex() {
    const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (
        <BlogLayout meta={{ title: 'Blog - seiya.me' }}>
            <h1>Blog</h1>
            <div className={styles.posts}>
                {
                    sortedPosts.map(({ slug, title, date }) =>
                        <Link href={'/blog/' + slug} key={slug}>
                            <a>
                                <span className={styles.title}>{title}</span>
                                <span className={styles.date}>{date}</span>
                            </a>
                        </Link>
                    )
                }
            </div>
        </BlogLayout>
    )
}
