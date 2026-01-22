import clientPromise from "@/lib/mongodb";
import { PageSchema } from "@/schema/page.schema";
import z from "zod";
import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "./cacheTags";

/**
 * Fetch a page by name OR slug OR route
 */
export const getPage = unstable_cache(
  async ({
    name,
    slug,
    route,
  }: {
    name?: string;
    slug?: string;
    route?: string;
  }) => {
    if (!name && !slug && !route) {
      throw new Error(
        "At least one identifier (name | slug | route) is required",
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env?.DATABASE_NAME);

    const query: Record<string, string> = {};
    if (name) query.name = name;
    if (slug) query.slug = slug;
    if (route) query.route = route;

    const page = await db
      .collection(process.env?.PAGES_COLLECTION as string)
      .findOne(query);

    if (!page) return null;

    //   console.log(page);

    // 🔒 Validate against schema (single page)
    const parsed = PageSchema.safeParse(page);

    if (!parsed.success) {
      console.error(z.treeifyError(parsed.error));
      throw new Error("Invalid page data in database");
    }

    return parsed.data;
  },
  [CACHE_TAGS.PAGES],
  {
    revalidate: 36000,
  },
);
