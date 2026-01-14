import { z } from "zod";

export type Wrapper = "section" | "article" | "div";

export const ComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    key: z.string(),

    name: z.string(),

    wrapper: z.enum(["section", "article", "div"]).optional(),

    id: z.string().optional(),

    variant: z.string().optional(),

    layout: z.string().optional(), // horizontal / vertical

    mode: z.string().optional(), // centered / spaced-around etc

    props: z.any().optional(),

    grid_span: z.number().optional(),

    is_contained: z.boolean().optional(),

    background: z
      .enum(["page", "surface", "card", "primary", "secondary"])
      .optional(),

    component_data: z.array(ComponentSchema).optional(),
  }),
);

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
  component_data: z.array(ComponentSchema),
});

export const PagesSchema = z.array(PageSchema);
