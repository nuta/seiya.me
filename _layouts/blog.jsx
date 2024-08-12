export default async function BlogLayout({ children, meta }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{meta.title} - MyBlog</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <header>
          <h1 className="italic">My Blog</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
