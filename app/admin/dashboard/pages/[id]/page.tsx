// app/admin/dashboard/pages/[id]/page.tsx
import EditPageClient from "@/components/admin/EditPageClient";

type Page = {
  _id: string;
  name: string;
  slug: string;
  route: string;
  status: "draft" | "published";
  seo?: {
    title?: string;
    description?: string;
  };
  component_data: any[];
  version: number;
  createdAt: string;
  updatedAt: string;
};

async function getPage(id: string): Promise<Page> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/pages/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  const response = await res.json();

  return response;
}

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await getPage(id);

  return <EditPageClient page={page} />;
}
