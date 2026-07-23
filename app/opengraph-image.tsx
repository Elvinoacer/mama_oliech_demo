import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mama Oliech Restaurant — Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#6b2d1a",
          color: "#f7f1e8",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.85 }}>
          Nairobi
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16, lineHeight: 1.1 }}>
          Mama Oliech
        </div>
        <div style={{ fontSize: 32, marginTop: 24, maxWidth: 800, opacity: 0.9 }}>
          Authentic Lake Victoria fish · Western Kenyan cooking
        </div>
      </div>
    ),
    { ...size },
  );
}
