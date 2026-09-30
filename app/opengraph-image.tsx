import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetches a TTF subset from Google Fonts containing just `text` (Satori can't read woff2). */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`,
      // An old Safari UA makes Google serve TTF.
      { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" } },
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Could not load ${family} ${weight} from Google Fonts`);
  return (await fetch(url)).arrayBuffer();
}

export default async function OpenGraphImage() {
  const windowTitle = "About Me";
  const text = site.name + site.tagline + site.education + windowTitle;
  const [regular, extraBold] = await Promise.all([
    loadGoogleFont("JetBrains+Mono", 400, text),
    loadGoogleFont("JetBrains+Mono", 800, text),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #000 0%, transparent 70%), radial-gradient(circle at 50% 50%, #7a2f6e 0%, transparent 45%), radial-gradient(circle at 50% 50%, #4e1d69 0%, #000 100%)",
          fontFamily: "JetBrains Mono",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            width: 1000,
            height: 430,
            display: "flex",
            flexDirection: "column",
            borderRadius: 32,
            border: "2px solid rgba(250,250,250,0.25)",
            backgroundColor: "rgba(250,250,250,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 28px 0" }}>
            <div style={{ fontSize: 22, opacity: 0.85 }}>{windowTitle}</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{ width: 20, height: 20, borderRadius: 10, border: "2px solid rgba(250,250,250,0.5)" }}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 72px",
            }}
          >
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1 }}>{site.name}</div>
            <div style={{ fontSize: 36, marginTop: 16, opacity: 0.9 }}>{site.tagline}</div>
            <div style={{ fontSize: 26, marginTop: 10, opacity: 0.7 }}>{site.education}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
