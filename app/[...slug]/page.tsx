import pages from "@/content/pages.json";
import { PagesSchema } from "@/schema/page.schema";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import z from "zod";
import { Metadata } from "next";

// ---------------------
// Generate dynamic metadata
// ---------------------
interface Params {
  slug?: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + (slug?.join("/") ?? "");

  const parsedPages = PagesSchema.safeParse(pages);
  if (!parsedPages.success) {
    console.error(z.treeifyError(parsedPages.error));
    return {
      title: "Page",
      description: "Default description",
    };
  }

  const page = parsedPages.data.find((item) => item.route === path);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: page.seo?.title ?? "CUSUB",
    description: page.seo?.description ?? "Default description",
  };
}

// ---------------------
// Page component
// ---------------------
export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  // "/about" | "/services/hr" | "/"
  const path = "/" + (slug?.join("/") ?? "");

  // Validate CMS data ONCE
  const parsedPages = PagesSchema.safeParse(pages);

  if (!parsedPages.success) {
    console.error(z.treeifyError(parsedPages.error));
    throw new Error("Invalid pages schema");
  }

  const page = parsedPages.data.find((item) => item.route === path);

  if (!page) {
    notFound();
  }

  return <SectionRenderer nodes={page.component_data} />;
}
