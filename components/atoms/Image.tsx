// atoms/Image.tsx
import Image from "next/image";
import React from "react";
import cn from "classnames";

type AspectRatio = "square" | "portrait" | "landscape" | "wide";

interface ImageProps {
  source: string;
  alt: string;
  width?: number;
  height?: number;
  mode?: "cover" | "contain";
  edges?: "rounded" | "squared";
  aspectRatio?: AspectRatio; // ✅ NEW (optional)
}

const aspectRatioMap: Record<AspectRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

const ImageAtom: React.FC<ImageProps> = ({
  source,
  alt,
  width = 600,
  height = 400,
  mode = "cover",
  edges = "rounded",
  aspectRatio,
}) => {
  const wrapperClass = cn(
    "relative w-full overflow-hidden bg-[var(--color-bg-surface)]",
    edges === "rounded" && "rounded-[var(--radius-lg)]",
    aspectRatio && aspectRatioMap[aspectRatio],
  );

  // 🔹 If aspectRatio is provided → responsive fill mode
  if (aspectRatio) {
    return (
      <div className={wrapperClass}>
        <Image src={source} alt={alt} fill className={`object-${mode}`} />
      </div>
    );
  }

  // 🔹 Default behavior (NO BREAKING CHANGE)
  return (
    <div className={wrapperClass}>
      <Image
        src={source}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto object-${mode}`}
      />
    </div>
  );
};

export default ImageAtom;
