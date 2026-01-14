import React from "react";
import { socialIconMap } from "@/components/atoms/Icons";

interface FooterProps {
  variant: "default";
  social?: Array<{
    label: string;
    href: string;
    icon: keyof typeof socialIconMap;
  }>;
  copyright?: string;
}

const Footer: React.FC<FooterProps> = ({ variant, social = [], copyright }) => {
  if (variant !== "default") return null;

  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-page)] mt-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        {/* Social */}
        {social.length > 0 && (
          <ul className="flex gap-6">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex items-center text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
                >
                  {socialIconMap[item.icon]}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Copyright */}
        {copyright && (
          <p className="text-center text-xs text-[var(--color-text-muted)] sm:text-right">
            {copyright}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
