// editors/ChipEditor.tsx
import React from "react";

type ChipEditorProps = {
  component: {
    variant: "section-label" | "tag";
    text: string;
    background?: "page" | "surface" | "card" | "primary" | "secondary";
  };
  path: string;
};

const ChipEditor: React.FC<ChipEditorProps> = ({ component, path }) => {
  const { text, variant, background } = component;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Chip
        <span className="ml-2 text-xs text-gray-400">{path}</span>
      </h3>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Text</label>
        <input
          type="text"
          defaultValue={text}
          className="rounded-md border px-3 py-2 text-sm"
          /* onChange handled by editor system */
        />
      </div>

      {/* Variant */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Variant</label>
        <select defaultValue={variant} className="rounded-md border px-3 py-2 text-sm">
          <option value="section-label">Section Label</option>
          <option value="tag">Tag</option>
        </select>
      </div>

      {/* Background */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Background</label>
        <select
          defaultValue={background ?? ""}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Default</option>
          <option value="page">Page</option>
          <option value="surface">Surface</option>
          <option value="card">Card</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
        </select>
      </div>
    </div>
  );
};

export default ChipEditor;
