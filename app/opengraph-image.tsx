import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>Divyansh Sahariya</div>
        <div style={{ fontSize: 32, color: "#C2F84F", marginTop: 20, display: "flex" }}>
          Software Engineer · AI Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
