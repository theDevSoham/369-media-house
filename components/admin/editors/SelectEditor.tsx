import React from "react";

type SelectEditorProps = {
  component: {
    key: string;
    name: "select";
    props: {
      name: string;
      label?: string;
      required?: boolean;
      options?: { label: string; value: string }[];
    };
  };
  path: string;
};

const SelectEditor: React.FC<SelectEditorProps> = ({ component, path }) => {
  const { key, name: componentName, props } = component;
  const { name, label = "", required = false, options = [] } = props ?? {};

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Select
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

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Field name</label>
        <input
          type="text"
          name={`${path}.props.name`} // ✅ Full path
          defaultValue={name}
          className="rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Label</label>
        <input
          type="text"
          name={`${path}.props.label`} // ✅ Full path
          defaultValue={label}
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
                name={`${path}.props.options.${index}.label`} // ✅ Full path for label
                defaultValue={option.label}
                placeholder="Label"
                className="rounded-md border px-2 py-1 text-sm"
              />

              <input
                type="text"
                name={`${path}.props.options.${index}.value`} // ✅ Full path for value
                defaultValue={option.value}
                placeholder="Value"
                className="rounded-md border px-2 py-1 text-sm"
              />
            </div>
          ))}
        </div>
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

export default SelectEditor;
