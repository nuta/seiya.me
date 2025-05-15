import { ImageResponse } from "next/og"


export async function GET(request: Request) {
    // Get title from query params or use default
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Writing Hypervisor in 10 days in Rust without KVM"

    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                border: "12px solid #000",
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
                        fontWeight: "bold",
                        color: "#000",
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
                        marginTop: "40px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "32px",
                            color: "#666",
                            textAlign: "center",
                        }}
                    >
                        seiya.me
                    </p>
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        },
    )
}
