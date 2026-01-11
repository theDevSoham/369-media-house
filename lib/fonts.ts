import {
  Inter,
  Poppins,
  Playfair_Display,
  Roboto_Mono
} from "next/font/google";

/**
 * ✅ Font loaders MUST be top-level consts
 */

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

export const playfairFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const monoFont = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});
