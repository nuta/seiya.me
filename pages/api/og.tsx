import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  const params = req.nextUrl.searchParams;
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
          padding: "30px",
          borderLeft: "20px solid rgb(117, 190, 255)",
          borderRight: "20px solid rgb(255, 215, 255)",
          borderTop: "20px solid rgb(171, 220, 255)",
          borderBottom: "20px solid rgb(115, 209, 255)",
        }}
      >
        {params.get("title")}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
