import React from "react";
import clsx from "clsx";
import Image from "next/image";

export const CARD_IMAGE_RATIO_MAP = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
} as const;

export type CardImageRatio = keyof typeof CARD_IMAGE_RATIO_MAP;

type PreviewProps = {
  variant: "preview";
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    ratio?: CardImageRatio;
  };
  background?: "page" | "surface" | "card";
};

type TestimonialProps = {
  variant: "testimonial";
  description: string; // 👈 REQUIRED for quote
  testimonial: {
    author: string;
    role: string;
    avatar?: string;
  };
  background?: "page" | "surface" | "card";
};

type CardProps = PreviewProps | TestimonialProps;

const backgroundMap: Record<NonNullable<CardProps["background"]>, string> = {
  page: "bg-[var(--color-bg-page)]",
  surface: "bg-[var(--color-bg-surface)]",
  card: "bg-[var(--color-bg-card)]",
};

const PreviewCard: React.FC<PreviewProps> = ({
  title,
  description,
  image,
  background = "page",
}) => {
  return (
    <div
      className={clsx(
        "h-full rounded-[28px] border border-black p-6",
        "flex flex-col gap-6",
        backgroundMap[background],
      )}
    >
      {image && (
        <div
          className={clsx(
            "relative w-full",
            CARD_IMAGE_RATIO_MAP[image.ratio ?? "landscape"],
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="h-px w-full bg-black" />

      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialProps> = ({
  description,
  testimonial,
  background = "page",
}) => {
  return (
    <div className="relative h-full">
      {/* Skewed background */}
      <div
        className={clsx(
          "absolute inset-0 -rotate-1 rounded-2xl border border-black",
          backgroundMap[background],
        )}
      />

      <div
        className={clsx(
          "relative flex h-full flex-col justify-between rounded-2xl border border-black p-6",
          backgroundMap[background],
        )}
      >
        {/* Quote */}
        <p className="text-base leading-relaxed italic">“{description}”</p>

        {/* Footer */}
        <div className="mt-6 flex items-center gap-3">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gray-200" />
          )}

          <div className="text-sm">
            <p className="font-medium">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </div>

        {/* Paper curl */}
        <div className="absolute bottom-0 right-0 h-6 w-6 rounded-tl-full border-l border-t border-black" />
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = (props) => {
  switch (props.variant) {
    case "preview":
      return <PreviewCard {...props} />;

    case "testimonial":
      return <TestimonialCard {...props} />;

    default:
      return null;
  }
};

export default Card;
