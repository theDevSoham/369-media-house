"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

type NavLink =
  | {
      key: string;
      type: "normal";
      label: string;
      link: string;
    }
  | {
      key: string;
      type: "button";
      label: string;
      action: "sign_in" | "sign_out";
    };

interface NavBarProps {
  brandImage: string;
  brandText: string;
  navLinks: NavLink[];
}

const isRouteActive = (pathname: string, link: string) => {
  // Home route
  if (link === "/") {
    return pathname === "/";
  }

  // Match nested routes
  return pathname === link || pathname.startsWith(link + "/");
};

const Navbar: React.FC<NavBarProps> = ({ brandImage, brandText, navLinks }) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathName = usePathname();

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    localStorage.setItem("theme-mode", next);
    setTheme(next);
  };

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
  }, []);

  return (
    <nav className="bg-[var(--color-bg-page)]">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex md:h-40 h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="md:h-20 md:w-24 h-10 w-16 rounded-[var(--radius-md)] bg-[var(--color-primary)] overflow-hidden">
              <Image
                width={500}
                height={250}
                src={brandImage}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-sans text-lg font-semibold text-[var(--color-text-primary)]">
              {brandText}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              switch (item.type) {
                case "normal":
                  return (
                    <NavItem
                      key={`nav_${item.type}_${item.key}`}
                      label={item.label}
                      link={item.link}
                      selected={isRouteActive(pathName, item.link)}
                    />
                  );

                case "button":
                  return (
                    <button
                      key={`nav_${item.type}_${item.key}`}
                      className="rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]"
                      onClick={() => {}}
                    >
                      {item.label}
                    </button>
                  );

                default:
                  return <></>;
              }
            })}

            {/* <button
              onClick={toggleTheme}
              className="rounded-[var(--radius-md)] p-2 transition-colors hover:bg-[var(--color-bg-card)] text-[var(--color-text-primary)]"
            >
              {theme === "light" && (
                <Moon className="h-5 w-5 text-[var(--color-text-secondary)]" />
              )}
              {theme === "dark" && (
                <Sun className="h-5 w-5 text-[var(--color-secondary)]" />
              )}
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-[var(--radius-md)] p-2 text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-page)]">
          <div className="flex flex-col gap-4 px-4 py-4">
            {navLinks.map((item) => {
              switch (item.type) {
                case "normal":
                  return (
                    <NavItem
                      key={`nav_mobile_${item.type}_${item.key}`}
                      label={item.label}
                      link={item.link}
                      mobile
                      selected={isRouteActive(pathName, item.link)}
                    />
                  );

                case "button":
                  return (
                    <button
                      key={`nav_mobile_${item.type}_${item.key}`}
                      className="mt-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverse)]"
                      onClick={() => {}}
                    >
                      {item.label}
                    </button>
                  );

                default:
                  return <></>;
              }
            })}
            {/* <button
              onClick={toggleTheme}
              className="rounded-[var(--radius-md)] p-2 transition-colors hover:bg-[var(--color-bg-card)] text-[var(--color-text-primary)]"
            >
              {theme === "light" && (
                <Moon className="h-5 w-5 text-[var(--color-text-secondary)]" />
              )}
              {theme === "dark" && (
                <Sun className="h-5 w-5 text-[var(--color-secondary)]" />
              )}
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({
  label,
  link,
  mobile = false,
  selected = false,
}: {
  label: string;
  link: string;
  mobile?: boolean;
  selected?: boolean;
}) => {
  const baseClasses =
    "font-sans text-xl font-extrabold transition-colors duration-200 ease-out";

  const spacingClasses = mobile
    ? "px-3 py-3 rounded-[var(--radius-md)]"
    : "px-4 py-2";

  // Text + hover ONLY for non-selected
  const textClasses = selected
    ? "text-[var(--color-text-primary)]"
    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]";

  // Selection styles differ for mobile vs desktop
  const selectedClasses = selected
    ? mobile
      ? "bg-[var(--color-bg-surface)]"
      : "bg-[var(--color-bg-surface)] rounded-full scale-[1.2] shadow-sm"
    : "";

  const cursorClass = selected ? "cursor-default" : "cursor-pointer";

  return (
    <Link
      href={link}
      className={`block ${baseClasses} ${spacingClasses} ${textClasses} ${selectedClasses} ${cursorClass}`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
