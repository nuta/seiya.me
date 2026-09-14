import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://seiya.me",
  prefetch: true,
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
    }),
  },
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      noExternal: ["react-tweet"],
    },
    // Native .node binary — Rolldown tries to parse it as UTF-8 otherwise.
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      external: ["@resvg/resvg-js"],
    },
  },
});
