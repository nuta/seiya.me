import type { Metadata } from 'next';
import "./global.css";

export const metadata: Metadata = {
  title: 'seiya.me',
};

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
