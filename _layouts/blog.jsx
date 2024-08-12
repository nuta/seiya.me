export default async function BlogLayout({ children, meta }) {
  const date = new Date(meta.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{meta.title} - MyBlog</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <style>{`
          body {
            color: rgba(33, 33, 33, 0.9);
            font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,sans-serif;
          }

          pre {
            overflow: scroll;
          }

          h1 {
            font-size: 1.2rem;
          }

          h2 {
            font-size: 1.4rem;
          }

          h3, h4, h5 {
            font-size: 1rem;
          }

          h1, h2, h3, h4, h5 {
            padding-top: 2rem;
          }

          h1 > a, h2 > a, h3 > a {
            color: inherit;
            text-decoration: none;
          }
          
          main {
            line-height: 2rem;
          }

          main p + p {
            margin-top: 2.5rem;
          }
        `}</style>
      </head>
      <body className="max-w-screen-md mx-auto px-4">
        <header className="mb-12">
          <h1>{meta.title}</h1>
          <p className="mt-0 text-neutral-500">
            <a href="/" className="text-inherit underline">Seiya Nuta</a>
            &nbsp;·&nbsp;
            {date}
          </p>
        </header>
        <main>
          {children}
        </main>
        <footer className="text-sm text-center leading-3 text-neutral-500 mt-8 mb-8">
            <p>—</p>
            <p>written by <a href="/" className="text-inherit underline">Seiya Nuta</a></p>
            <p>CC BY 4.0</p>
        </footer>
      </body>
    </html>
  );
}
