import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="dark:bg-slate-800">{children}</body>
    </html>
  );
}
