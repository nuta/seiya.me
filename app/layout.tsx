import './global.css';
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Seiya Nuta",
  alternates: {
    types: {
      "application/atom+xml": [
        {
          title: "seiya.me",
          url: "https://seiya.me/atom.xml",
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-2xl mx-4 mt-8 lg:mx-auto">
        <main>
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
