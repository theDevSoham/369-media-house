// editors/SelectEditor.tsx
import React from "react";

type SelectEditorProps = {
  component: {
    name: string;
    label?: string;
    required?: boolean;
    options?: { label: string; value: string }[];
  };
  path: string;
};

const SelectEditor: React.FC<SelectEditorProps> = ({ component, path }) => {
  const { name, label = "", required = false, options = [] } = component;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Select
        <span className="ml-2 text-xs text-gray-400">{path}</span>
      </h3>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Field name</label>
        <input
          type="text"
          value={name}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Label</label>
        <input
          type="text"
          value={label}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Options */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Options</label>

        <div className="space-y-2">
          {options.map((option, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-2 rounded-md border p-2"
            >
              <input
                type="text"
                value={option.label}
                placeholder="Label"
                className="rounded-md border px-2 py-1 text-sm"
              />

              <input
                type="text"
                value={option.value}
                placeholder="Value"
                className="rounded-md border px-2 py-1 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Required */}
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={required} className="h-4 w-4" />
        <label className="text-xs font-medium text-gray-600">
          Required field
        </label>
      </div>
    </div>
  );
};

export default SelectEditor;
