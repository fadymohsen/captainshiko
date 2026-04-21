import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Coach Mohamed Roshdy – Captain Shiko";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const imgData = await readFile(join(process.cwd(), "public", "coach-main.jpeg"));
  const imgSrc = `data:image/jpeg;base64,${imgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          position: "relative",
        }}
      >
        {/* Coach photo on the right */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "45%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <img
            src={imgSrc}
            alt="Coach Mohamed Roshdy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          {/* Gradient overlay to blend photo into background */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(to right, #0f0f1a, transparent)",
              display: "flex",
            }}
          />
        </div>

        {/* Text content on the left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
            width: "60%",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#f59e0b",
              textTransform: "uppercase",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            Captain Shiko
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            Coach Mohamed Roshdy
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#d1d5db",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Elite Online Fitness Coaching — Personalized Training & Nutrition Plans
          </div>
          <div
            style={{
              marginTop: "16px",
              fontSize: 18,
              color: "#9ca3af",
              display: "flex",
            }}
          >
            captainshiko.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
