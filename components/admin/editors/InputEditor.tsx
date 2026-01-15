// editors/InputEditor.tsx
import React from "react";

type InputType = "text" | "email" | "number" | "password";

type InputEditorProps = {
  component: {
    name: string;
    label?: string;
    type?: InputType;
    placeholder?: string;
    required?: boolean;
  };
  path: string;
};

const InputEditor: React.FC<InputEditorProps> = ({ component, path }) => {
  const {
    name,
    label = "",
    type = "text",
    placeholder = "",
    required = false,
  } = component;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Input
        <span className="ml-2 text-xs text-gray-400">{path}</span>
      </h3>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Field name</label>
        <input
          type="text"
          defaultValue={name}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="e.g. email, username"
        />
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Label</label>
        <input
          type="text"
          defaultValue={label}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Visible label"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Type</label>
        <select defaultValue={type} className="rounded-md border px-3 py-2 text-sm">
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="password">Password</option>
        </select>
      </div>

      {/* Placeholder */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Placeholder</label>
        <input
          type="text"
          defaultValue={placeholder}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Hint text"
        />
      </div>

      {/* Required */}
      <div className="flex items-center gap-2">
        <input type="checkbox" defaultChecked={!!required} className="h-4 w-4" />
        <label className="text-xs font-medium text-gray-600">
          Required field
        </label>
      </div>
    </div>
  );
};

export default InputEditor;
