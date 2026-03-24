import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title =
    searchParams.get("title") ?? "Catalyst Education";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "#1F1D1A",
          padding: "56px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: 64,
            height: 4,
            background: "#E5484D",
            borderRadius: 2,
            marginBottom: 40,
            display: "flex",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              background: "rgba(229,72,77,0.12)",
              border: "1px solid rgba(229,72,77,0.35)",
              borderRadius: 100,
              padding: "7px 18px",
              color: "#E5484D",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 0.5,
              display: "flex",
            }}
          >
            TVO ILC · Authorized Representative
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#F5F2EE",
            fontSize: title.length > 50 ? 44 : 52,
            fontWeight: 700,
            lineHeight: 1.25,
            flex: 1,
            display: "flex",
            alignItems: "center",
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              color: "#E5484D",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              display: "flex",
            }}
          >
            CATALYST EDUCATION
          </div>
          <div
            style={{
              color: "#6B6459",
              fontSize: 15,
              display: "flex",
            }}
          >
            catalyst-education-web.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
