import React from "react";

const ASPECT_RATIOS = [
  "none",
  "square",
  "portrait",
  "landscape",
  "wide",
] as const;
const MODES = ["cover", "contain"] as const;
const EDGES = ["rounded", "squared"] as const;

export default function ImageEditor({ component }: any) {
  const { props } = component;

  return (
    <div className="space-y-4">
      {/* Source */}
      <div>
        <label className="text-xs font-medium">Source</label>
        <input
          type="text"
          defaultValue={props.source}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Alt */}
      <div>
        <label className="text-xs font-medium">Alt text</label>
        <input
          type="text"
          defaultValue={props.alt}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Aspect Ratio */}
      <div>
        <label className="text-xs font-medium">Aspect Ratio</label>
        <select
          defaultValue={props.aspectRatio ?? "none"}
          className="w-full rounded-md border px-2 py-1 text-sm"
        >
          {ASPECT_RATIOS.map((ratio) => (
            <option key={ratio} value={ratio}>
              {ratio}
            </option>
          ))}
        </select>
      </div>

      {/* Object Fit */}
      <div>
        <label className="text-xs font-medium">Image Fit</label>
        <select
          defaultValue={props.mode ?? "cover"}
          className="w-full rounded-md border px-2 py-1 text-sm"
        >
          {MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>

      {/* Edges */}
      <div>
        <label className="text-xs font-medium">Edges</label>
        <select
          defaultValue={props.edges ?? "rounded"}
          className="w-full rounded-md border px-2 py-1 text-sm"
        >
          {EDGES.map((edge) => (
            <option key={edge} value={edge}>
              {edge}
            </option>
          ))}
        </select>
      </div>

      {/* Width / Height (only meaningful if aspectRatio is not set) */}
      {!props.aspectRatio && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium">Width</label>
            <input
              type="number"
              defaultValue={props.width ?? 600}
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium">Height</label>
            <input
              type="number"
              defaultValue={props.height ?? 400}
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
