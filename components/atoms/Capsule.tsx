import React from "react";
import clsx from "clsx";
import Image from "next/image";

/* ----------------------------------
 * Variants
 * ---------------------------------- */
type CapsuleVariant = "image-capsule";

/* ----------------------------------
 * Size map
 * ---------------------------------- */
const CAPSULE_SIZE_MAP = {
  sm: "h-14 px-6",
  md: "h-20 px-10",
  lg: "h-28 px-14",
} as const;

type CapsuleSize = keyof typeof CAPSULE_SIZE_MAP;

/* ----------------------------------
 * Background map
 * ---------------------------------- */
const CAPSULE_BG_MAP = {
  transparent: "bg-transparent",
  surface: "bg-[var(--color-bg-surface)]",
  page: "bg-[var(--color-bg-page)]",
} as const;

type CapsuleBackground = keyof typeof CAPSULE_BG_MAP;

/* ----------------------------------
 * Props
 * ---------------------------------- */
interface CapsuleProps {
  variant: CapsuleVariant;

  image?: {
    src: string;
    alt: string;
  };

  size?: CapsuleSize;
  border?: boolean;
  background?: CapsuleBackground;
}

/* ----------------------------------
 * Component
 * ---------------------------------- */
const Capsule: React.FC<CapsuleProps> = ({
  variant,
  image,
  size = "md",
  border = true,
  background = "transparent",
}) => {
  if (variant === "image-capsule" && image) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center",
          "rounded-full",
          CAPSULE_SIZE_MAP[size],
          CAPSULE_BG_MAP[background],
          border && "border border-black",
        )}
      >
        <div className="relative h-full w-auto max-w-full">
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Capsule;
