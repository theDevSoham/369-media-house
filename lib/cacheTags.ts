export const CACHE_TAGS = {
  PAGES: "pages",
  PAGE: (slug: string) => `page:${slug}`,
  NAV: "navigation",
  FOOTER: "footer",
} as const;
