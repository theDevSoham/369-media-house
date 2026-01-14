// app/[...slug]/page.tsx
import pages from "@/content/pages.json";
import { PagesSchema } from "@/schema/page.schema";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import z from "zod";
import { Metadata } from "next";

type PageParams = {
  slug?: string[];
};

/* ---------------------------------------
   Helper: resolve page by route
---------------------------------------- */
function getPageByPath(path: string) {
  const parsed = PagesSchema.safeParse(pages);

  if (!parsed.success) {
    console.error(z.treeifyError(parsed.error));
    throw new Error("Invalid pages schema");
  }

  return parsed.data.find((page) => page.route === path);
}

/* ---------------------------------------
   Metadata
---------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");

  const page = getPageByPath(path);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: page.seo?.title ?? "369 Media House",
    description: page.seo?.description ?? "Default description",
  };
}

/* ---------------------------------------
   Page
---------------------------------------- */
export default async function DynamicPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");

  const page = getPageByPath(path);

  if (!page) {
    notFound();
  }

  return <SectionRenderer nodes={page.component_data} />;
}
