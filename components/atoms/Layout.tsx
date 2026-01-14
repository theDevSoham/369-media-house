// atoms/Layout.tsx
import React from "react";
import clsx from "clsx";

const GRID_COLS_MAP: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
  8: "md:grid-cols-8",
  9: "md:grid-cols-9",
  10: "md:grid-cols-10",
  11: "md:grid-cols-11",
  12: "md:grid-cols-12",
};

const SPACING_Y_MAP = {
  none: "",
  sm: "py-4",
  md: "py-8",
  lg: "py-12",
  xl: "py-20",
};

const SPACING_X_MAP = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
  xl: "px-12",
};

const MARGIN_Y_MAP = {
  none: "",
  sm: "my-4",
  md: "my-8",
  lg: "my-12",
  xl: "my-20",
};

const MARGIN_X_MAP = {
  none: "",
  sm: "mx-4",
  md: "mx-6",
  lg: "mx-8",
  xl: "mx-12",
};

const MOBILE_ORDER_MAP = {
  normal: "",
  reverse: "flex flex-col-reverse md:grid",
};

type Mode =
  | "centered" // legacy (keep as-is)
  | "content-center" // NEW – safe for text
  | "items-center-x" // horizontal only
  | "items-center-y" // vertical only
  | "spaced-around-center";

interface LayoutProps {
  layout?: "horizontal" | "vertical";
  mode?: Mode;
  children?: React.ReactNode;
  totalColumns?: number;
  gap?: string;

  paddingY?: keyof typeof SPACING_Y_MAP;
  paddingX?: keyof typeof SPACING_X_MAP;
  marginY?: keyof typeof MARGIN_Y_MAP;
  marginX?: keyof typeof MARGIN_X_MAP;
  mobileOrder?: "normal" | "reverse"; // ✅ NEW
}

const MODE_CLASS_MAP = {
  centered: "place-items-center text-center", // legacy
  "content-center": "justify-center text-center",
  "items-center-x": "justify-center",
  "items-center-y": "items-center",
  "spaced-around-center": "place-items-center",
};

const Layout: React.FC<LayoutProps> = ({
  layout = "horizontal",
  mode,
  children,
  totalColumns = 1,
  gap = "gap-8",

  paddingY = "none",
  paddingX = "none",
  marginY = "none",
  marginX = "none",

  mobileOrder = "normal", // ✅ default safe
}) => {
  return (
    <div
      className={clsx(
        // Mobile
        mobileOrder === "reverse" ? "flex flex-col-reverse" : "grid",

        // Desktop
        "md:grid",
        "grid-cols-1",
        gap,

        layout === "horizontal" && GRID_COLS_MAP[totalColumns],
        layout === "vertical" && "grid-cols-1",

        SPACING_Y_MAP[paddingY],
        SPACING_X_MAP[paddingX],
        MARGIN_Y_MAP[marginY],
        MARGIN_X_MAP[marginX],

        mode && MODE_CLASS_MAP[mode],
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
