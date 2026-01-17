// editors/TextareaEditor.tsx
import React from "react";

type TextareaEditorProps = {
  component: {
    key: string;
    name: "textarea";
    props?: {
      name?: string;
      label?: string;
      rows?: number;
      //   placeholder?: string;
      required?: boolean;
    };
  };
  path: string;
};

const TextareaEditor: React.FC<TextareaEditorProps> = ({ component, path }) => {
  const { key, name: componentName, props } = component;

  const { name = "", label = "", rows = 4, required = false } = props ?? {};

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Textarea
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
          name={`${path}.props.name`} // ✅ FIX
          defaultValue={name}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="e.g. message"
        />
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Label</label>
        <input
          type="text"
          name={`${path}.props.label`} // ✅ FIX
          defaultValue={label}
          className="rounded-md border px-3 py-2 text-sm"
          placeholder="Visible label"
        />
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Rows</label>
        <input
          type="number"
          min={1}
          name={`${path}.props.rows`} // ✅ FIX
          defaultValue={rows}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Placeholder */}
      {/* <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Placeholder</label>
        <input
          type="text"
          name={`${path}.props.placeholder`} // ✅ FIX
          defaultValue={placeholder}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div> */}

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

export default TextareaEditor;
