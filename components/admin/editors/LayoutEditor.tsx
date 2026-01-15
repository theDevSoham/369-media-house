import React from "react";

type Props = {
  component: any;
  path: string;
};

const SPACING_OPTIONS = ["none", "sm", "md", "lg", "xl"];
const GAP_OPTIONS = ["gap-2", "gap-4", "gap-6", "gap-8", "gap-12"];
const MODES = [
  "centered",
  "content-center",
  "items-center-x",
  "items-center-y",
  "spaced-around-center",
];

const LayoutEditor: React.FC<Props> = ({ component, path }) => {
  const props = component.props ?? {};

  return (
    <div className="space-y-4 rounded-md border bg-gray-50 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Layout Settings</h3>

      {/* Layout direction */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Layout Direction
        </label>
        <select
          name={`${path}.layout`}
          defaultValue={component.layout ?? "horizontal"}
          className="w-full rounded border px-2 py-1 text-sm"
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>

      {/* Columns */}
      {component.layout !== "vertical" && (
        <div>
          <label className="block text-xs font-medium mb-1">
            Total Columns
          </label>
          <input
            type="number"
            min={1}
            max={12}
            name={`${path}.props.totalColumns`}
            defaultValue={props.totalColumns ?? 1}
            className="w-full rounded border px-2 py-1 text-sm"
          />
        </div>
      )}

      {/* Gap */}
      <div>
        <label className="block text-xs font-medium mb-1">Gap</label>
        <select
          name={`${path}.props.gap`}
          defaultValue={props.gap ?? "gap-8"}
          className="w-full rounded border px-2 py-1 text-sm"
        >
          {GAP_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Mode */}
      <div>
        <label className="block text-xs font-medium mb-1">Alignment Mode</label>
        <select
          name={`${path}.mode`}
          defaultValue={component.mode ?? ""}
          className="w-full rounded border px-2 py-1 text-sm"
        >
          <option value="">None</option>
          {MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Padding */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Padding X</label>
          <select
            name={`${path}.props.paddingX`}
            defaultValue={props.paddingX ?? "none"}
            className="w-full rounded border px-2 py-1 text-sm"
          >
            {SPACING_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Padding Y</label>
          <select
            name={`${path}.props.paddingY`}
            defaultValue={props.paddingY ?? "none"}
            className="w-full rounded border px-2 py-1 text-sm"
          >
            {SPACING_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Margin */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Margin X</label>
          <select
            name={`${path}.props.marginX`}
            defaultValue={props.marginX ?? "none"}
            className="w-full rounded border px-2 py-1 text-sm"
          >
            {SPACING_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Margin Y</label>
          <select
            name={`${path}.props.marginY`}
            defaultValue={props.marginY ?? "none"}
            className="w-full rounded border px-2 py-1 text-sm"
          >
            {SPACING_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Order */}
      <div>
        <label className="block text-xs font-medium mb-1">Mobile Order</label>
        <select
          name={`${path}.props.mobileOrder`}
          defaultValue={props.mobileOrder ?? "normal"}
          className="w-full rounded border px-2 py-1 text-sm"
        >
          <option value="normal">Normal</option>
          <option value="reverse">Reverse</option>
        </select>
      </div>
    </div>
  );
};

export default LayoutEditor;
