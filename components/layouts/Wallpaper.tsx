import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import styles from './Wallpaper.module.scss';

export interface Meta {
    title: string;
}

export default function Wallpaper({ meta, children }: PropsWithChildren<{ meta: Meta }>) {
    const router = useRouter();
    return (
        <div className={styles.wallpaper}>
            <Head>
                <title>{meta.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:url" content={`https://seiya.me${router.asPath}`} />
                <link rel="canonical" href={`https://seiya.me${router.asPath}`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="seiya.me" />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content="" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content="" />
            </Head>
            {children}
        </div>
    );
}
