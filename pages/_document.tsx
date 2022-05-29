import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-one-dark.min.css" integrity="sha512-c6S8OdtvoqZCbMfA1lWE0qd368pLdFvVHVILQzNizfowC+zV8rmVKdSlmL5SuidvATO0A7awDg53axd+s/9amw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
