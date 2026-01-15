// app/admin/dashboard/themes/page.tsx
"use client";

import React, { useState } from "react";
import { getTheme } from "@/lib/theme";
import { Theme } from "@/schema/theme.schema";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import clsx from "clsx";

dayjs.extend(advancedFormat);

async function fetchTheme(): Promise<Theme | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/themes`,
    {
      cache: "no-store",
      credentials: "include", // send cookies for auth
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch theme");
  }

  const theme: Theme = await res.json();
  return theme;
}

export default function ThemePage() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchTheme()
      .then((data) => setTheme(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading theme…</p>;
  }

  if (!theme) {
    return <p className="text-red-500">Theme not found</p>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    path: string[],
  ) => {
    if (!theme) return;

    const newTheme = { ...theme };
    let cursor: any = newTheme;

    // Traverse path to the final key
    path.slice(0, -1).forEach((key) => {
      cursor = cursor[key];
    });

    cursor[path[path.length - 1]] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setTheme(newTheme);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/themes/${theme.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });
      if (!res.ok) throw new Error("Failed to save theme");
      alert("Theme saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving theme");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Theme Editor</h1>

      <div className="overflow-hidden rounded-md border bg-white p-6 shadow-sm space-y-4">
        {/* Meta */}
        <h2 className="text-lg font-semibold">Meta</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={theme.meta.name}
              onChange={(e) => handleInputChange(e, ["meta", "name"])}
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Version</label>
            <input
              type="text"
              value={theme.meta.version}
              onChange={(e) => handleInputChange(e, ["meta", "version"])}
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={theme.meta.supportsDark}
              onChange={(e) => handleInputChange(e, ["meta", "supportsDark"])}
              className="h-4 w-4"
            />
            <label className="text-xs font-medium text-gray-600">
              Supports Dark Mode
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Default Mode
            </label>
            <select
              value={theme.meta.defaultMode}
              onChange={(e) => handleInputChange(e, ["meta", "defaultMode"])}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Typography */}
        <h2 className="text-lg font-semibold mt-6">Typography</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Font Sans
            </label>
            <input
              type="text"
              value={theme.typography.fontFamily.sans}
              onChange={(e) =>
                handleInputChange(e, ["typography", "fontFamily", "sans"])
              }
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Font Mono
            </label>
            <input
              type="text"
              value={theme.typography.fontFamily.mono}
              onChange={(e) =>
                handleInputChange(e, ["typography", "fontFamily", "mono"])
              }
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Base Size
            </label>
            <input
              type="text"
              value={theme.typography.fontSize.base}
              onChange={(e) =>
                handleInputChange(e, ["typography", "fontSize", "base"])
              }
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">XL Size</label>
            <input
              type="text"
              value={theme.typography.fontSize.xl}
              onChange={(e) =>
                handleInputChange(e, ["typography", "fontSize", "xl"])
              }
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Radius */}
        <h2 className="text-lg font-semibold mt-6">Radius</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Medium</label>
            <input
              type="text"
              value={theme.radius.md}
              onChange={(e) => handleInputChange(e, ["radius", "md"])}
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Large</label>
            <input
              type="text"
              value={theme.radius.lg}
              onChange={(e) => handleInputChange(e, ["radius", "lg"])}
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Audit Info */}
        <p className="text-xs text-gray-400 mt-4">
          Created: {dayjs(theme.createdAt).format("Do MMM YYYY, h:mm A")}
          <br />
          Updated: {dayjs(theme.updatedAt).format("Do MMM YYYY, h:mm A")}
        </p>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={clsx(
            "rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-900",
            saving && "opacity-60",
          )}
        >
          {saving ? "Saving…" : "Save Theme"}
        </button>
      </div>
    </div>
  );
}
