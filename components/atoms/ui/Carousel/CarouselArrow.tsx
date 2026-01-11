"use client";

import React, { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ArrowDirection = "left" | "right";

interface CarouselArrowProps {
  direction: ArrowDirection;
  onClick: () => void;
  visible: boolean;
  label?: string;
  className?: string;
  size?: number; // size of the icon
}

const CarouselArrow: FC<CarouselArrowProps> = ({
  direction,
  onClick,
  visible,
  label,
  className = "",
  size = 30,
}) => {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex justify-center items-center shadow-lg hover:scale-110 transition-transform ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.2)",
      }}
    >
      {direction === "left" ? (
        <ChevronLeft size={size} />
      ) : (
        <ChevronRight size={size} />
      )}
    </button>
  );
};

export default CarouselArrow;
