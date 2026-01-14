// atoms/Chip.tsx
import React from "react";
import clsx from "clsx";

interface ChipProps {
  variant: "section-label" | "tag";
  text: string;
  background?: "page" | "surface" | "card" | "primary" | "secondary";
}

const BG_MAP: Record<NonNullable<ChipProps["background"]>, string> = {
  page: "bg-[var(--color-bg-page)]",
  surface: "bg-[var(--color-bg-surface)]",
  card: "bg-[var(--color-bg-card)]",
  primary: "bg-[var(--color-primary)]",
  secondary: "bg-[var(--color-secondary)]",
};

const CHIP_VARIANT_STYLES = {
  "section-label": {
    wrapper: "flex justify-center",
    chip: "rounded-full px-12 py-3",
    text: "font-sans font-bold text-lg md:text-xl",
    defaultBg: "surface",
  },

  "tag": {
    wrapper: "flex justify-center",
    chip: "rounded-full px-8 py-3 border border-black bg-transparent",
    text: "font-sans font-semibold text-base",
    defaultBg: "page",
  },
} as const;

const Chip: React.FC<ChipProps> = ({ variant, text, background }) => {
  const styles = CHIP_VARIANT_STYLES[variant];
  const resolvedBg = background ?? styles.defaultBg;

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.chip, resolvedBg && BG_MAP[resolvedBg])}>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  );
};

export default Chip;
