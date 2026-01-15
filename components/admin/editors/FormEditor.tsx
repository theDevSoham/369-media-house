import React from "react";
import ComponentEditorRegistry from "../ComponentEditorRegistry";

type Props = {
  component: any;
  path: string;
};

const FormEditor: React.FC<Props> = ({ component, path }) => {
  const { props = {} } = component;
  const { fields = [] } = props;

  return (
    <div className="space-y-4">
      {/* ===== Form Settings ===== */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium">Variant</label>
          <select
            defaultValue={props.variant ?? "stacked"}
            className="w-full rounded-md border px-2 py-1 text-sm"
          >
            <option value="stacked">Stacked</option>
            <option value="inline">Inline</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium">Method</label>
          <select
            defaultValue={props.method ?? "POST"}
            className="w-full rounded-md border px-2 py-1 text-sm"
          >
            <option value="POST">POST</option>
            <option value="GET">GET</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="text-xs font-medium">Submit Action (API)</label>
          <input
            type="text"
            defaultValue={props.submitAction}
            placeholder="/api/contact"
            className="w-full rounded-md border px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium">Submit Label</label>
          <input
            type="text"
            defaultValue={props.submitLabel ?? "Submit"}
            className="w-full rounded-md border px-2 py-1 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium col-span-2">
          <input type="checkbox" defaultChecked={props.clearFormAfterSubmit} />
          Clear form after submit
        </label>
      </div>

      {/* ===== Fields ===== */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-600">
          Fields ({fields.length})
        </p>

        {fields.map((field: any, index: number) => {
          const fieldPath = `${path}.props.fields.${index}`;

          return (
            <div
              key={field.key}
              className="rounded-md border bg-gray-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 bg-gray-100">
                <div>
                  <p className="text-sm font-medium capitalize">{field.name}</p>
                  <p className="text-xs text-gray-500">{field.key}</p>
                </div>

                {field.grid_span && (
                  <span className="text-xs text-gray-500">
                    span {field.grid_span}
                  </span>
                )}
              </div>

              <div className="p-3 space-y-3">
                {/* Field editor (Input / Textarea / Select etc.) */}
                <ComponentEditorRegistry component={field} path={fieldPath} />

                {/* Nested layouts inside fields (rare but supported) */}
                {field.component_data?.length > 0 && (
                  <div className="pl-4 border-l">
                    {field.component_data.map(
                      (child: any, childIndex: number) => (
                        <ComponentEditorRegistry
                          key={child.key}
                          component={child}
                          path={`${fieldPath}.component_data.${childIndex}`}
                        />
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormEditor;
