import React from "react";
import ComponentEditorRegistry from "../ComponentEditorRegistry";

type Props = {
  component: any;
  path: string;
};

const ListEditor: React.FC<Props> = ({ component, path }) => {
  const { props = {} } = component;
  const { items = [] } = props;

  return (
    <div className="space-y-4">
      {/* ===== List-level controls ===== */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium">Layout</label>
          <select
            defaultValue={props.layout ?? "vertical"}
            className="w-full rounded-md border px-2 py-1 text-sm"
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium">Align</label>
          <select
            defaultValue={props.align ?? "start"}
            className="w-full rounded-md border px-2 py-1 text-sm"
          >
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="text-xs font-medium">Container Class</label>
          <input
            type="text"
            defaultValue={props.containerClass}
            className="w-full rounded-md border px-2 py-1 text-sm"
            placeholder="px-4 lg:px-8"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-medium col-span-2">
          <input type="checkbox" defaultChecked={props.wrap} />
          Wrap items (horizontal only)
        </label>
      </div>

      {/* ===== Items ===== */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-600">
          Items ({items.length})
        </p>

        {items.map((item: any, index: number) => {
          const itemPath = `${path}.props.items.${index}`;

          return (
            <div
              key={item.key}
              className="rounded-md border bg-gray-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 bg-gray-100">
                <div>
                  <p className="text-sm font-medium capitalize">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.key}</p>
                </div>

                {item.grid_span && (
                  <span className="text-xs text-gray-500">
                    span {item.grid_span}
                  </span>
                )}
              </div>

              <div className="p-3 space-y-3">
                {/* Item editor */}
                <ComponentEditorRegistry component={item} path={itemPath} />

                {/* Nested children */}
                {item.component_data?.length > 0 && (
                  <div className="pl-4 border-l">
                    <ListEditor
                      component={{
                        name: "list",
                        props: { items: item.component_data },
                      }}
                      path={`${itemPath}.component_data`}
                    />
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

export default ListEditor;
