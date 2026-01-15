"use client";

import PageComponentTree from "./PageComponentTree";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";

dayjs.extend(advancedFormat);

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

export default function EditPageClient({ page }: { page: Page }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const values: Record<string, string> = {};
    data.forEach((value, key) => {
      values[key] = value.toString();
    });

    console.log("All form values:", values);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Edit Page</h1>
        <p className="text-sm text-gray-500">
          Configure routing, metadata and publishing status
        </p>
      </div>

      {/* Form (UI only for now) */}
      <form
        className="space-y-6 rounded-md border bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Page Name</label>
          <input
            type="text"
            defaultValue={page.name}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            defaultValue={page.slug}
            disabled
            className="w-full rounded-md border bg-gray-100 px-3 py-2 text-sm text-gray-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Slug is system-generated and cannot be changed
          </p>
        </div>

        {/* Route */}
        <div>
          <label className="block text-sm font-medium mb-1">Route</label>
          <input
            type="text"
            defaultValue={page.route}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            defaultValue={page.status}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* SEO */}
        <div>
          <h2 className="text-lg font-semibold mb-2">SEO</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                SEO Title
              </label>
              <input
                type="text"
                defaultValue={page.seo?.title ?? ""}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                SEO Description
              </label>
              <textarea
                defaultValue={page.seo?.description ?? ""}
                rows={3}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Sections</h2>

          <PageComponentTree components={page.component_data} />
        </div>

        {/* Metadata (read-only) */}
        <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
          Last updated on{" "}
          <span className="font-medium">
            {dayjs(page.updatedAt).format("Do MMM YYYY")}
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/dashboard/pages"
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
