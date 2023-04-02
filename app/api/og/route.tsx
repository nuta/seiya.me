import { getPostByTitle } from "@/lib/blog";
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  try {
    getPostByTitle(title ?? "");
  } catch (e) {
    if (e instanceof Error && e.message.includes("not found")) {
      return new Response("I'm not an arbitrary image generator", {
        status: 418,
      });
    }

    throw e;
  }

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
