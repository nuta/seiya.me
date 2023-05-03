import { getPostBySlug } from "@/lib/blog";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    console.error("invalid OG image request:", request.url)
    return new Response("missing slug", { status: 400 });
  }

  const title = getPostBySlug(slug).title;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          color: "#333",
          backgroundColor: "#fcfcfc",
          fontSize: "70px",
          paddingTop: "30px",
          paddingBottom: "30px",
          paddingLeft: "50px",
          paddingRight: "50px",
          borderLeft: "40px solid rgb(117, 190, 255)",
          borderRight: "40px solid rgb(255, 215, 255)",
          borderTop: "20px solid rgb(171, 220, 255)",
          borderBottom: "20px solid rgb(115, 209, 255)",
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
