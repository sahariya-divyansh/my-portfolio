import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path
            d="M20 15 C20 15 20 85 20 85 C45 85 65 85 75 65 C85 45 75 25 55 25 C40 25 35 40 45 48 C52 53 62 48 60 38"
            stroke="#C2F84F"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
