import Head from 'next/head';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styles from './BlogLayout.module.scss';
import Wallpaper, { Meta } from './Wallpaper';

export default function BlogLayout({ meta, children }: PropsWithChildren<{ meta: Meta }>) {
    return (
        <Wallpaper meta={meta}>
            <Head>
                <link rel="alternate" type="application/atom+xml" href="https://seiya.me/atom.xml" title="seiya.me Blog" />
            </Head>

            <nav className={styles.nav}>
                <div>
                    <Link href="/">
                        seiya.me
                    </Link>
                </div>
                <div className={styles.navRight}>
                    <Link href="/blog">Blog</Link>
                    <Link href="/atom.xml">Feed</Link>
                </div>
            </nav>

            <main className={styles.main}>
                {children}

                <footer className={styles.footer}>
                    — written by Seiya Nuta<br />
                    CC BY 4.0
                </footer>
            </main>
        </Wallpaper>
    );
}
