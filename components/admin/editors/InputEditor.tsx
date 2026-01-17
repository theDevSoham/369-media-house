// editors/InputEditor.tsx
import React from "react";

type InputType = "text" | "email" | "number" | "password";

type InputEditorProps = {
  component: {
    key: string;
    name: "input";
    props: {
      name: string;
      label?: string;
      type?: InputType;
      placeholder?: string;
      required?: boolean;
    };
  };
  path: string;
};

const InputEditor: React.FC<InputEditorProps> = ({ component, path }) => {
  const { key, name: componentName, props } = component;
  const {
    name,
    label = "",
    type = "text",
    placeholder = "",
    required = false,
  } = props ?? {};

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Input
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

      {/* Field name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Field name</label>
        <input
          type="text"
          name={`${path}.props.name`}
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
          name={`${path}.props.label`}
          defaultValue={label}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Visible label"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Type</label>
        <select
          name={`${path}.props.type`}
          defaultValue={type}
          className="rounded-md border px-3 py-2 text-sm"
        >
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
          name={`${path}.props.placeholder`}
          defaultValue={placeholder}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Hint text"
        />
      </div>

      {/* Required */}
      <div className="flex items-center gap-2">
        <input type="hidden" name={`${path}.props.required`} value="false" />
        <input
          type="checkbox"
          name={`${path}.props.required`}
          value="true"
          defaultChecked={!!required}
          className="h-4 w-4"
        />
        <label className="text-xs font-medium text-gray-600">
          Required field
        </label>
      </div>
    </div>
  );
};

export default InputEditor;
