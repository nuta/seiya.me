import './global.css';
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Seiya Nuta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-2xl mx-4 my-12 lg:mx-auto">
        <main>
          {children}
        </main>
        <footer className="text-center mt-12">
          &mdash; <br />
          Written by <Link href="/">Seiya Nuta</Link>
          <br />
          CC BY 4.0
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
