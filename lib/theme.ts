import { Theme, ThemeSchema } from "@/schema/theme.schema";
import themeJson from "@/content/theme.json";
import { z } from "zod";

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
