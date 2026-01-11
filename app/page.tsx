import React from "react";
import pages from "@/content/pages.json";
import { PagesSchema } from "@/schema/page.schema";
import z from "zod";
import SectionRenderer from "@/components/SectionRenderer";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  const pageData = PagesSchema.safeParse(pages);

  if (!pageData.success) {
    console.error(z.treeifyError(pageData.error));
    throw new Error("Invalid page schema");
  }

  return {
    title: pageData.data.find((item) => item.name === "landing_page")!.seo
      ?.title,
    description: pageData.data.find((item) => item.name === "landing_page")!.seo
      ?.description,
  };
}

const App = () => {
  const pageData = PagesSchema.safeParse(pages);

  if (!pageData.success) {
    console.error(z.treeifyError(pageData.error));
    throw new Error("Invalid page schema");
  }

  return (
    <SectionRenderer
      nodes={
        pageData.data.find((item) => item.name === "landing_page")!
          .component_data
      }
    />
  );
};

export default App;
