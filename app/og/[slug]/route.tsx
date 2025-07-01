import {
  BlogPost,
  getBlogPostBySlug,
  getBlogPosts,
  PostNotFoundError,
} from "@/lib/blog";
import { ImageResponse } from "next/og";

export async function generateStaticParams(): Promise<
  { params: { slug: string } }[]
> {
  const posts = await getBlogPosts();
  return Object.keys(posts).map((slug) => ({
    params: { slug },
  }));
}

async function loadGoogleFont(font: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${font.replace(" ", "+")}:wght@${weight}`;
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
    if (e instanceof PostNotFoundError) {
      return new Response("not found", { status: 404 });
    }

    throw e;
  }

  const title = post.frontmatter.title;
  const montserratBold = await loadGoogleFont("Montserrat", 800);
  const montserratSemiBold = await loadGoogleFont("Montserrat", 600);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          padding: "80px",
          fontFamily: "Montserrat",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 20 ? "65px" : "85px",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "left",
              margin: "0 0 170px 0",
              lineHeight: 1.3,
              fontFamily: "Montserrat",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.85)",
              textAlign: "left",
              margin: "0",
              fontFamily: "Montserrat",
            }}
          >
            seiya.me/blog/{slug}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Montserrat",
          data: montserratBold,
          style: "normal",
          weight: 800,
        },
        {
          name: "Montserrat",
          data: montserratSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
