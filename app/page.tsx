import React from "react";
import pages from "@/content/pages.json";
import { PagesSchema } from "@/schema/page.schema";
import z from "zod";
import SectionRenderer from "@/components/SectionRenderer";
import { Metadata } from "next";
import { getPage } from "@/lib/pages";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPage({ name: "landing_page" });

  if (!pageData) {
    return {
      title: "Page",
      description: "Not found",
    };
  }

  return {
    title: pageData.seo?.title,
    description: pageData.seo?.description,
  };
}

const App = async () => {
  const pageData = await getPage({ name: "landing_page" });

  if (!pageData) {
    notFound();
  }

  return <SectionRenderer nodes={pageData.component_data} />;
};

export default App;
