import type { Metadata } from "next";
import "./globals.css";
import { loadTheme, themeToCssVars } from "@/lib/theme";
import { fontMap } from "@/lib/fontMap";

export const metadata: Metadata = {
  title: "369 Media House",
  description:
    "Strategic social media, digital campaigns, and communication solutions that drive real impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = loadTheme();

  const lightVars = themeToCssVars(theme, "light");
  const darkVars = themeToCssVars(theme, "dark");

  const css = `
    html[data-theme="light"] {
    ${Object.entries(lightVars)
      .map(([k, v]) => `${k}: ${v};`)
      .join("")}
    }

    html[data-theme="dark"] {
    ${Object.entries(darkVars)
      .map(([k, v]) => `${k}: ${v};`)
      .join("")}
    }
  `;

  const fontVariables = Object.values(fontMap)
    .map((f) => f.loader.variable)
    .join(" ");

  return (
    <html lang="en" data-theme={theme.meta.defaultMode} className={fontVariables}>
      <head>
        <style id="theme-vars" suppressHydrationWarning>
          {css}
        </style>

        {/* theme sync WITHOUT touching style */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                const saved = localStorage.getItem("theme-mode");
                if (saved) {
                  document.documentElement.dataset.theme = saved;
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
