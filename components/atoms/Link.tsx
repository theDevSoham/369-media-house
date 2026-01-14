import React from "react";
import clsx from "clsx";
import NextLink from "next/link";

type LinkVariant =
  | "contact-phone"
  | "contact-email"
  | "navigation"
  | "external"
  | "address";

type LinkType = "normal" | "underlined" | "button" | "muted";

interface LinkProps {
  variant: LinkVariant;
  type?: LinkType;
  label: string;
  value: string;
  icon?: React.ReactNode;
  target?: "_blank" | "_self";
}

const VARIANT_TO_HREF = (variant: LinkVariant, value: string) => {
  switch (variant) {
    case "contact-phone":
      return `tel:${value}`;
    case "contact-email":
      return `mailto:${value}`;
    case "address":
      return `https://maps.google.com/?q=${encodeURIComponent(value)}`;
    default:
      return value;
  }
};

const TYPE_CLASS_MAP: Record<LinkType, string> = {
  normal: "text-base font-medium",
  underlined: "underline underline-offset-4",
  muted: "text-sm opacity-70",
  button:
    "inline-flex items-center rounded-full px-6 py-3 font-semibold bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:opacity-90",
};

const Link: React.FC<LinkProps> = ({
  variant,
  type = "normal",
  label,
  value,
  icon,
  target = "_self",
}) => {
  const href = VARIANT_TO_HREF(variant, value);

  return (
    <NextLink
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={clsx(
        "transition-colors",
        TYPE_CLASS_MAP[type],
        type !== "button" &&
          "text-[var(--color-text-primary)] hover:opacity-80",
      )}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
    </NextLink>
  );
};

export default Link;
