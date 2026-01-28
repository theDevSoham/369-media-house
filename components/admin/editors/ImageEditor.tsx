"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";

const ASPECT_RATIOS = ["square", "portrait", "landscape", "wide"] as const;
const MODES = ["cover", "contain"] as const;
const EDGES = ["rounded", "squared"] as const;

type ImageEditorProps = {
  component: {
    key: string;
    name: "image";
    is_contained?: boolean;
    grid_span?: number;
    row_span?: number;
    props: {
      source: string;
      alt: string;
      width?: number;
      height?: number;
      mode?: "cover" | "contain";
      edges?: "rounded" | "squared";
      aspectRatio?: "square" | "portrait" | "landscape" | "wide";
    };
  };
  path: string;
};

export default function ImageEditor({ component, path }: ImageEditorProps) {
  const { key, name, is_contained, grid_span, row_span, props } = component;
  const {
    source,
    alt,
    width,
    height,
    mode = "cover",
    edges = "rounded",
    aspectRatio,
  } = props;

  const {
    sourceValue,
    previewSrc,
    fileRef,
    handleFileChange,
    handleConfirm,
    handleRevert,
    isDirty,
  } = useImageUpload(source);

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Image <span className="ml-2 text-xs text-gray-400">{path}</span>
      </h3>

      {/* identity */}
      <input type="hidden" name={`${path}.name`} value={name} />

      <input type="hidden" name={`${path}.props.source`} value={sourceValue} />

      {/* Key */}
      <div>
        <label className="text-xs font-medium">Key (unique)</label>
        <input
          type="text"
          name={`${path}.key`}
          defaultValue={key}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Grid span */}
      <div>
        <label className="text-xs font-medium">Grid span</label>
        <input
          type="number"
          min={0}
          name={`${path}.grid_span`}
          defaultValue={grid_span ?? ""}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Row span */}
      <div>
        <label className="text-xs font-medium">Row span</label>
        <input
          type="number"
          min={0}
          name={`${path}.row_span`}
          defaultValue={row_span ?? ""}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Is contained */}
      <div className="flex items-center gap-2">
        <input type="hidden" name={`${path}.is_contained`} value="false" />
        <input
          type="checkbox"
          name={`${path}.is_contained`}
          value="true"
          defaultChecked={!!is_contained}
          className="h-4 w-4"
        />
        <label className="text-xs font-medium">Contained</label>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <label className="text-xs font-medium">Preview</label>

        <div className="relative w-full overflow-hidden rounded-md border bg-gray-50">
          <Image
            src={previewSrc as string}
            alt={alt}
            width={width ?? 600}
            height={height ?? 400}
            className={`w-full h-auto object-${mode}`}
          />
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex gap-3">
          {isDirty ? (
            <>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white"
              >
                Confirm
              </button>

              <button
                type="button"
                onClick={handleRevert}
                className="rounded-md border px-3 py-1.5 text-xs"
              >
                Revert
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-md border px-3 py-1.5 text-xs"
            >
              Upload image
            </button>
          )}
        </div>

        {isDirty && (
          <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            <p className="font-semibold">⚠ Important</p>
            <p className="mt-1 leading-relaxed">
              Uploading and confirming an image only updates the preview.
              <br />
              <strong>The image is NOT saved yet.</strong>
            </p>
            <p className="mt-1 leading-relaxed">
              To permanently set this image, you must click{" "}
              <strong>Save</strong> or <strong>Publish</strong> on the page.
              <br />
              If you leave this page without saving, the image will be lost.
            </p>
          </div>
        )}
      </div>

      {/* Width */}
      <div>
        <label className="text-xs font-medium">Width (required for seo)</label>
        <input
          type="number"
          name={`${path}.props.width`}
          defaultValue={width}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Height */}
      <div>
        <label className="text-xs font-medium">Height (required for seo)</label>
        <input
          type="number"
          name={`${path}.props.height`}
          defaultValue={height}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Alt */}
      <div>
        <label className="text-xs font-medium">Image alternate text</label>
        <input
          type="text"
          name={`${path}.props.alt`}
          defaultValue={alt}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Mode */}
      <div>
        <label className="text-xs font-medium">Mode</label>
        <select
          name={`${path}.props.mode`}
          defaultValue={mode}
          className="w-full rounded-md border px-2 py-1 text-sm"
        >
          {MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Aspect ratio */}
      {/* {aspectRatio && ( */}
      <div>
        <label className="text-xs font-medium">Aspect ratio</label>
        <select
          name={`${path}.props.aspectRatio`}
          defaultValue={aspectRatio ?? ""}
          className="w-full rounded-md border px-2 py-1 text-sm"
        >
          <option value="">None</option>
          {ASPECT_RATIOS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      {/* )} */}

      {/* Edges */}
      <div>
        <label className="text-xs font-medium">Edges</label>
        <select
          name={`${path}.props.edges`}
          defaultValue={edges}
          className="w-full rounded-md border px-2 py-1 text-sm"
        >
          {EDGES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
