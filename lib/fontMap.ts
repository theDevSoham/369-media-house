import {
  interFont,
  poppinsFont,
  playfairFont,
  monoFont
} from "./fonts";

export type FontKey =
  | "inter"
  | "poppins"
  | "playfair"
  | "mono";

/**
 * ✅ SINGLE SOURCE OF TRUTH
 * No font loader calls here (Next.js safe)
 */
export const fontMap: Record<
  FontKey,
  {
    loader: typeof interFont;
    cssVar: string;
    className: string;
    utility: string;
  }
> = {
  inter: {
    loader: interFont,
    cssVar: "--font-inter",
    className: interFont.className,
    utility: "font-inter"
  },

  poppins: {
    loader: poppinsFont,
    cssVar: "--font-poppins",
    className: poppinsFont.className,
    utility: "font-poppins"
  },

  playfair: {
    loader: playfairFont,
    cssVar: "--font-playfair",
    className: playfairFont.className,
    utility: "font-playfair"
  },

  mono: {
    loader: monoFont,
    cssVar: "--font-mono",
    className: monoFont.className,
    utility: "font-mono"
  }
};
