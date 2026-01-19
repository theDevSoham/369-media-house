// atoms/Typography.tsx
import React, { JSX } from "react";
import clsx from "clsx";

type TypographyMode = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type TextAlign = "left" | "center" | "right" | "justify";

interface TypographyProps {
  mode: TypographyMode;
  text: string;
  align?: TextAlign; // ✅ new, optional
}

/**
 * Alignment → Tailwind class map
 * Easily extendable without touching component logic
 */
const ALIGNMENT_MAP: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Mode → typography style map
 */
const MODE_CLASS_MAP: Record<TypographyMode, string> = {
  h1: "font-sans text-4xl md:text-6xl font-bold",
  h2: "font-sans text-xl md:text-2xl font-semibold",
  h3: "font-sans text-lg font-semibold",
  h4: "font-sans text-base font-semibold",
  h5: "font-sans text-sm font-medium",
  h6: "font-sans text-xs font-medium uppercase tracking-wide",
  p: "text-sm leading-relaxed",
};

const Typography: React.FC<TypographyProps> = ({
  mode,
  text,
  align = "center", // ✅ default to center
}) => {
  const Tag = mode as keyof JSX.IntrinsicElements;

  return (
    <Tag className={clsx(ALIGNMENT_MAP[align], MODE_CLASS_MAP[mode])}>
      {text}
    </Tag>
  );
};

export default Typography;
