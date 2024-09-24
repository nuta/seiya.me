export default async function BlogIndexLayout({ children, meta, pages }) {
  const blogPages = pages
    .filter(({ href, layout }) => {
      return href.startsWith("/blog/") && href !== "/blog/index";
    })
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

  return (
    <html>
      <head>
        <title>Seiya's Blog</title>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Seiya's Blog" />
        <meta property="og:title" content="Seiya's Blog" />
        <meta property="og:site_name" content="Seiya's Blog" />
      </head>
      <body className="mx-auto max-w-3xl w-full py-8 px-4">
        <header className="mb-8 pb-1 border-b border-gray-200">
          <h1 className="text-base sm:text-2xl font-bold">Blog</h1>
        </header>
        <main>
          <ul>
            {blogPages.map((page) => {
              const date = new Date(page.meta.date);
              return (
                <li className="my-2">
                  <a href={page.href}>{page.meta.title}</a>
                  &nbsp;
                  <span className="text-sm">
                    (
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    )
                  </span>
                </li>
              );
            })}
          </ul>
        </main>
        <footer className="mt-8 border-t border-gray-200 py-4 text-center">
          written by <a href="/">Seiya Nuta</a>
        </footer>
      </body>
    </html>
  );
}
