import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "Catalyst Education";
  const subtitle = searchParams.get("subtitle") ?? "";
  const locale = searchParams.get("locale") ?? "tr";

  const badgeText =
    locale === "en"
      ? "TVO ILC · Authorized Partner"
      : "TVO ILC Yetkili Temsilcisi";

  const trustItems =
    locale === "en"
      ? ["Official Ontario Diploma", "100% Online", "Globally Recognized"]
      : ["Resmi Ontario Diploması", "%100 Online", "Uluslararası Tanınırlık"];

  const titleSize =
    title.length > 45 ? 44 : title.length > 30 ? 56 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#F5F0E8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left red accent bar */}
        <div
          style={{
            width: 7,
            background: "#E5484D",
            display: "flex",
            flexShrink: 0,
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "56px 80px",
          }}
        >
          {/* Top row: trust badge + domain */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "white",
                border: "1.5px solid rgba(229,72,77,0.35)",
                borderRadius: 100,
                padding: "9px 22px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#E5484D",
                  display: "flex",
                }}
              />
              <span
                style={{
                  color: "#E5484D",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  display: "flex",
                }}
              >
                {badgeText}
              </span>
            </div>
            <span
              style={{ color: "#A89880", fontSize: 15, display: "flex" }}
            >
              catalysteducation.ca
            </span>
          </div>

          {/* Center: Title + Subtitle */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                color: "#1F1D1A",
                fontSize: titleSize,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1,
                display: "flex",
                maxWidth: 920,
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  color: "#5A4F44",
                  fontSize: 29,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  display: "flex",
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          {/* Bottom row: brand + trust indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 22,
              borderTop: "1px solid rgba(31,29,26,0.12)",
            }}
          >
            <span
              style={{
                color: "#1F1D1A",
                fontSize: 19,
                fontWeight: 800,
                letterSpacing: 2,
                display: "flex",
              }}
            >
              CATALYST EDUCATION
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: "#8B7D70",
                fontSize: 14,
              }}
            >
              <span style={{ display: "flex" }}>{trustItems[0]}</span>
              <span style={{ display: "flex", color: "#C4B4A4" }}>·</span>
              <span style={{ display: "flex" }}>{trustItems[1]}</span>
              <span style={{ display: "flex", color: "#C4B4A4" }}>·</span>
              <span style={{ display: "flex" }}>{trustItems[2]}</span>
            </div>
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
