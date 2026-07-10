import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(["en", "ja"]).optional(),
  }),
});

export const collections = { blog };
