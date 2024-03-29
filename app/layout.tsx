import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./global.css";

export const metadata: Metadata = {
  title: "seiya.me",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="dark:bg-neutral-900 dark:text-neutral-200 w-full">{children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
