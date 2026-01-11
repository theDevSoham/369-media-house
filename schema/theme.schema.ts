import { z } from "zod";

const ColorGroup = z.record(z.string(), z.string());

const ModeSchema = z.object({
  colors: z.object({
    brand: ColorGroup,
    background: ColorGroup,
    text: ColorGroup,
    border: ColorGroup,
    state: ColorGroup,
  }),
});

export const ThemeSchema = z.object({
  meta: z.object({
    name: z.string(),
    version: z.string(),
    supportsDark: z.boolean(),
    defaultMode: z.enum(["light", "dark"]),
  }),

  modes: z.object({
    light: ModeSchema,
    dark: ModeSchema.optional(),
  }),

  typography: z.object({
    fontFamily: z.object({
      sans: z.string(),
      mono: z.string(),
    }),
    fontSize: z.object({
      base: z.string(),
      xl: z.string(),
    }),
  }),

  radius: z.object({
    md: z.string(),
    lg: z.string(),
  }),
});

export type Theme = z.infer<typeof ThemeSchema>;
