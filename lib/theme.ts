import { Theme, ThemeSchema } from "@/schema/theme.schema";
import themeJson from "@/content/theme.json";
import { z } from "zod";
import clientPromise from "./mongodb";

export function themeToCssVars(theme: Theme, mode?: "light" | "dark") {
  const activeMode = mode ?? theme.meta.defaultMode;
  const colors = theme.modes[activeMode]?.colors;

  if (!colors) {
    throw new Error(`Theme mode "${activeMode}" not found`);
  }

  const vars: Record<string, string> = {};

  // colors.*
  for (const [group, values] of Object.entries(colors)) {
    for (const [key, value] of Object.entries(values)) {
      vars[`--colors-${group}-${key}`] = value;
    }
  }

  // typography
  vars["--font-sans"] = theme.typography.fontFamily.sans;
  vars["--font-mono"] = theme.typography.fontFamily.mono;
  vars["--font-size-base"] = theme.typography.fontSize.base;
  vars["--font-size-xl"] = theme.typography.fontSize.xl;

  // radius
  vars["--radius-md"] = theme.radius.md;
  vars["--radius-lg"] = theme.radius.lg;

  return vars;
}

export function cssVarsToString(
  vars: Record<string, string>,
  selector = ":root",
) {
  return `${selector} {${Object.entries(vars)
    .map(([k, v]) => `${k}: ${v};`)
    .join("")}}`;
}

export function loadTheme() {
  const parsed = ThemeSchema.safeParse(themeJson);

  if (!parsed.success) {
    console.error(z.treeifyError(parsed.error));
    throw new Error("Invalid theme.json");
  }

  return parsed.data;
}

/**
 * Fetch a theme by name OR slug OR id
 */
export async function getTheme({
  slug,
}: {
  slug?: "default-theme";
}) {
  if (!slug) {
    throw new Error("At least one identifier (slug) is required");
  }

  const client = await clientPromise;
  const db = client.db(process.env?.DATABASE_NAME);

  const query: Record<string, string> = {};
  if (slug) query.slug = slug;

  const theme = await db
    .collection(process.env?.THEME_COLLECTION as string)
    .findOne(query);

  if (!theme) return null;

  // console.log(theme);

  // 🔒 Validate against schema
  const parsed = ThemeSchema.safeParse(theme);

  if (!parsed.success) {
    console.error(z.treeifyError(parsed.error));
    throw new Error("Invalid theme data in database");
  }

  return parsed.data;
}
