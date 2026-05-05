import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Josh Holzhauser — Full-Stack Developer & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, #0F1A2E 0%, #07080B 60%)",
          color: "#F9FAFB",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: "#86A8FF",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          Josh Holzhauser
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Full-stack developer.</span>
          <span style={{ color: "#5B8DEF" }}>Solo builder.</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#9CA3AF",
            marginTop: 36,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Custom websites, business tools, automations, and SaaS — concept to deployed.
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 28,
            fontSize: 22,
            color: "#6B7280",
          }}
        >
          <span>joshholzhauser.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
