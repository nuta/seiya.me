import { BlogPost, getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { ImageResponse } from "next/og";

export async function generateStaticParams(): Promise<
  { params: { slug: string } }[]
> {
  const posts = await getBlogPosts();
  return Object.keys(posts).map((slug) => ({
    params: { slug },
  }));
}

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font.replace(" ", "+")}:wght@400;600;700;800&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;
  let post: BlogPost;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (e) {
    if (e instanceof Error && (e as any).code === "ENOENT") {
      return new Response("not found", { status: 404 });
    }

    throw e;
  }

  const title = post.frontmatter.title;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "30px solid #7DB3F8",
          borderBottom: "30px solid #695653",
          backgroundColor: "#fefefe",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "#333",
              textAlign: "center",
              margin: "0",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <p
              style={{
                fontSize: "35px",
                fontWeight: "bold",
                color: "#6a6a6a",
                textAlign: "center",
              }}
            >
              seiya.me
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
