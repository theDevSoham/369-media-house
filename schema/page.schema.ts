import { z } from "zod";

export type Wrapper = "section" | "article" | "div";

export const PageSchema = z.object({
  name: z.string(),
  slug: z.string(),
  route: z.string(),
  seo: z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .optional(),
  component_data: z.array(
    z.object({
      wrapper: z.enum(["section", "article", "div"]).optional(),
      key: z.string(),
      name: z.string(),
      variant: z.string().optional(),
      props: z.any().optional(),
      container: z.string().optional(),
      is_contained: z.boolean(),
      background: z
        .enum(["page", "surface", "card", "primary", "secondary"])
        .optional(),
    }),
  ),
});

export const PagesSchema = z.array(PageSchema);
