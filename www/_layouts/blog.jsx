export default async function Blog({ children, meta, pages }) {
  return (
    <html>
      <head>
        <title>{meta.title} - Seiya Nuta</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </head>
      <body className="mx-auto max-w-2xl w-full py-8 px-4">
        <header className="mb-8 pb-1 border-b border-gray-200">
          <h1 className="text-base sm:text-2xl font-bold my-sans">{meta.title}</h1>
          <div className="mt-2 font-bold">
            <a href="/">Seiya Nuta</a>
            &nbsp; • &nbsp;
            {new Date(meta.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-8 border-t border-gray-200 py-4 text-center">
          written by <a href="/">Seiya Nuta</a>
          <br />
          CC BY 4.0
        </footer>
      </body>
    </html>
  );
}
