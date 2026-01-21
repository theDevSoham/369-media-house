"use client";

import {
  applyComponentPatch,
  denormalizeComponent,
  formDataToNestedObject,
  normalizeForPatch,
  pruneTerminatedValues,
} from "@/utils/admin/EditPageUtils";
import PageComponentTree from "./PageComponentTree";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";

dayjs.extend(advancedFormat);

const TOAST_ID = "save-page";

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
  const [isSaving, setIsSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSaving) return;

    setIsSaving(true);

    toast.loading("Saving changes…", { id: TOAST_ID });

    try {
      if (!formRef.current) {
        console.error("Form ref not attached");
        toast.error("Internal error: form not ready", { id: TOAST_ID });
        return;
      }

      const formData = new FormData(formRef.current);

      for (const [k, v] of formData.entries()) {
        console.log("FORM:", k, v);
      }
      const patch = pruneTerminatedValues(formDataToNestedObject(formData));
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

      const res = await fetch(`/api/admin/pages/${page._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        console.error("PUT failed", res.status, errorBody);
        toast.error(errorBody?.error ?? "Failed to update page", {
          id: TOAST_ID,
        });
        return;
      }

      const updatedPage = await res.json();
      console.log("PAGE UPDATED SUCCESSFULLY:", updatedPage);
      toast.success("Page updated successfully ✅", { id: TOAST_ID });
    } catch (err) {
      console.error("handleSubmit error:", err);
      toast.error("Something went wrong while saving the page ❌", {
        id: TOAST_ID,
      });
    } finally {
      const timeout = setTimeout(() => {
        toast.dismiss(TOAST_ID);
        clearTimeout(timeout);
      }, 2000);
      setIsSaving(false);
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
        id="edit-page-form"
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
        {/* <div className="flex justify-end gap-3">
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
        </div> */}
      </form>

      {/* Floating Action Panel */}
      <div className="fixed bottom-6 right-8 z-50 bg-none backdrop-blur">
        <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg">
          <Link
            href={isSaving ? "#" : "/admin/dashboard/pages"}
            className={clsx(
              "rounded-md border px-4 py-2 text-sm",
              isSaving && "pointer-events-none opacity-50",
            )}
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="edit-page-form"
            disabled={isSaving}
            onClick={() => formRef.current?.requestSubmit()}
            className={clsx(
              "rounded-md px-5 py-2 text-sm font-medium text-white transition",
              isSaving
                ? "cursor-not-allowed bg-gray-400"
                : "bg-black hover:bg-black/90",
            )}
          >
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
