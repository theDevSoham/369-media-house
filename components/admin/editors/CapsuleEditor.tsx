// editors/CapsuleEditor.tsx
import React from "react";

type CapsuleEditorProps = {
  component: {
    key: string;
    name: "capsule";
    variant: "image-capsule";
    props: {
      image?: {
        src: string;
        alt: string;
      };
      size?: "sm" | "md" | "lg";
      border?: boolean;
      background?: "transparent" | "surface" | "page";
    };
  };
  path: string;
};

const CapsuleEditor: React.FC<CapsuleEditorProps> = ({ component, path }) => {
  const { key, name: componentName, props, variant } = component;
  const {
    image = { src: "", alt: "" },
    size = "md",
    border = true,
    background = "transparent",
  } = props ?? {};

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Capsule
        <span className="ml-2 text-xs text-gray-400">{path}</span>
      </h3>

      <div className="flex flex-col">
        <input type="hidden" name={`${path}.name`} value={componentName} />
      </div>

      {/* Field key */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Key(unique)</label>
        <input
          type="text"
          name={`${path}.key`} // ✅ FIX
          defaultValue={key}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Key"
        />
      </div>

      {/* Variant (read-only for now) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Variant</label>
        <input
          type="text"
          name={`${path}.variant`}
          defaultValue={variant}
          disabled
          className="rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-500"
        />
      </div>

      {/* Image */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Image</label>

        <input
          type="text"
          name={`${path}.props.image.src`}
          defaultValue={image.src ?? ""}
          placeholder="Image source URL"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />

        <input
          type="text"
          name={`${path}.props.image.alt`}
          defaultValue={image.alt ?? ""}
          placeholder="Alt text"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Size */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Size</label>
        <select
          name={`${path}.props.size`}
          defaultValue={size}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>

      {/* Background */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Background</label>
        <select
          name={`${path}.props.background`}
          defaultValue={background}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="transparent">Transparent</option>
          <option value="surface">Surface</option>
          <option value="page">Page</option>
        </select>
      </div>

      {/* Border */}
      <div className="flex items-center gap-2">
        <input type="hidden" name={`${path}.props.border`} value="false" />

        <input
          type="checkbox"
          name={`${path}.props.border`}
          value="true"
          defaultChecked={!!border}
          className="h-4 w-4"
        />
        <label className="text-xs font-medium text-gray-600">Show border</label>
      </div>
    </div>
  );
};

export default CapsuleEditor;
