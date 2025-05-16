import { BlogPost, getBlogPosts } from "@/lib/blog";
import { Feed } from "feed";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function parseDate(page: BlogPost): Date {
  if (typeof page.frontmatter.date !== "string") {
    throw new Error(
      `${page.slug}: Missing "date" field in the front matter`,
    );
  }

  if (!page.frontmatter.date.match(DATE_REGEX)) {
    throw new Error(
      `${page.slug}: Invalid "date" value - must be YYYY-MM-DD`,
    );
  }

  return new Date(page.frontmatter.date);
}

function generateFeed(
  pages: BlogPost[],
): string {
  const feed = new Feed({
    title: "seiya.me",
    id: "https://seiya.me",
    link: "https://seiya.me",
    copyright: "Seiya Nuta",
    author: {
      name: "Seiya Nuta",
    }
  });

  const sortedPages = pages.sort((a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);

    return dateA.getTime() - dateB.getTime();
  });

  for (const page of sortedPages) {
    const date = parseDate(page);
    const title = page.frontmatter.title;
    const link = `https://seiya.me/blog/${page.slug}`;

    if (typeof title !== "string") {
      throw new Error(`${page.slug}: Missing "title" field`);
    }

    feed.addItem({
      title,
      link,
      date,
    });
  }

  return feed.atom1();
}

export const dynamic = "force-static";

export const GET = async (req: Request) => {
  const pages = Object.values(await getBlogPosts())
  const feed = generateFeed(pages)
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  })
}