import { z } from "zod";

export const ComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
  }),
);

export const ComponentArraySchema = z.array(ComponentSchema);

export type ComponentNodeArray = z.infer<typeof ComponentArraySchema>;
