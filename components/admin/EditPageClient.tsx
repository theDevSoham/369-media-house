"use client";

import {
  applyComponentPatch,
  denormalizeComponent,
  formDataToNestedObject,
  normalizeForPatch,
} from "@/utils/admin/EditPageUtils";
import PageComponentTree from "./PageComponentTree";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formRef.current) {
        console.error("Form ref not attached");
        alert("Internal error: form not ready");
        return;
      }

      const formData = new FormData(formRef.current);

      for (const [k, v] of formData.entries()) {
        console.log("FORM:", k, v);
      }
      const patch = formDataToNestedObject(formData);
      //   console.log("PATCH:", JSON.stringify(patch, null, 2));

      // Clone existing tree (never mutate source)
      const updatedComponentData = structuredClone(page.component_data).map(
        normalizeForPatch,
      );

      const rootMap = Object.fromEntries(
        updatedComponentData.map((c: any) => [c.key, c]),
      );

      if (patch.component_data) {
        applyComponentPatch(rootMap, patch.component_data);
      }

      const finalComponentData =
        Object.values(updatedComponentData).map(denormalizeComponent);

      const payload = {
        _id: page._id,
        name: patch.name ?? page.name,
        slug: page.slug,
        route: patch.route ?? page.route,
        status: patch.status ?? page.status,
        seo: {
          title: patch.seo?.title ?? page.seo?.title,
          description: patch.seo?.description ?? page.seo?.description,
        },
        component_data: finalComponentData,
      };

      console.log("FINAL PAYLOAD:", JSON.stringify(payload));

      //   const res = await fetch(`/api/admin/pages/${page._id}`, {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(payload),
      //   });

      //   if (!res.ok) {
      //     const errorBody = await res.json().catch(() => null);
      //     console.error("PUT failed", res.status, errorBody);
      //     alert(errorBody?.error ?? "Failed to update page");
      //     return;
      //   }

      //   const updatedPage = await res.json();
      //   console.log("PAGE UPDATED SUCCESSFULLY:", updatedPage);
      //   alert("Page updated successfully ✅");
    } catch (err) {
      console.error("handleSubmit error:", err);
      alert("Something went wrong while saving the page ❌");
    }
  };

  useEffect(() => {
    console.log("Page ", JSON.stringify(page));
  }, [page]);

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Edit Page</h1>
        <p className="text-sm text-gray-500">
          Configure routing, metadata and publishing status
        </p>
      </div>

      <form
        ref={formRef}
        className="space-y-6 rounded-md border bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Page Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Page Name</label>
          <input
            name="name"
            type="text"
            defaultValue={page.name}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Slug (read-only, not submitted) */}
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            defaultValue={page.slug}
            disabled
            className="w-full rounded-md border bg-gray-100 px-3 py-2 text-sm text-gray-500"
          />
        </div>

        {/* Route */}
        <div>
          <label className="block text-sm font-medium mb-1">Route</label>
          <input
            name="route"
            type="text"
            defaultValue={page.route}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
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
                name="seo.title"
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
                name="seo.description"
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

        {/* Metadata */}
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
