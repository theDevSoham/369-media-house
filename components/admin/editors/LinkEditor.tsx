// editors/LinkEditor.tsx
import React from "react";

type LinkVariant =
  | "contact-phone"
  | "contact-email"
  | "navigation"
  | "external"
  | "address";

type LinkType = "normal" | "underlined" | "button" | "muted";

type LinkEditorProps = {
  component: {
    key: string;
    name: "link";
    props: {
      variant: LinkVariant;
      type?: LinkType;
      label: string;
      value: string;
      target?: "_blank" | "_self";
    };
  };
  path: string;
};

const LinkEditor: React.FC<LinkEditorProps> = ({ component, path }) => {
  const { key, name: componentName, props } = component;
  const { label, value, variant, type = "normal", target = "_self" } = props;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Link
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

      {/* Label */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Label</label>
        <input
          type="text"
          defaultValue={label}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Value */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Value</label>
        <input
          type="text"
          defaultValue={value}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="URL / phone / email / address"
        />
      </div>

      {/* Variant */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Variant</label>
        <select
          defaultValue={variant}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="navigation">Navigation</option>
          <option value="external">External</option>
          <option value="contact-phone">Contact – Phone</option>
          <option value="contact-email">Contact – Email</option>
          <option value="address">Address</option>
        </select>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Style</label>
        <select
          defaultValue={type}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="normal">Normal</option>
          <option value="underlined">Underlined</option>
          <option value="button">Button</option>
          <option value="muted">Muted</option>
        </select>
      </div>

      {/* Target */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Target</label>
        <select
          defaultValue={target}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="_self">Same Tab</option>
          <option value="_blank">New Tab</option>
        </select>
      </div>
    </div>
  );
};

export default LinkEditor;
