export default async function BlogIndexLayout({ children, meta, pages }) {
  const blogPages = pages.filter(({ href }) => href !== "/blog/index");
  console.log(blogPages.map((page) => page.href));
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>My Blog</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body>
        <main>
          <ul>
            {blogPages.map((page) => (
              <li>
                <a href={page.href}>{page.meta.title}</a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
