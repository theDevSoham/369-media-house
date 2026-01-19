// editors/CapsuleEditor.tsx
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import React from "react";

type CapsuleEditorProps = {
  component: {
    key: string;
    name: "capsule";
    variant: "image-capsule";
    props: {
      image?: {
        src: string;
        alt: string;
      };
      size?: "sm" | "md" | "lg";
      border?: boolean;
      background?: "transparent" | "surface" | "page";
    };
  };
  path: string;
};

const CapsuleEditor: React.FC<CapsuleEditorProps> = ({ component, path }) => {
  const { key, name: componentName, props, variant } = component;
  const {
    image = { src: "", alt: "" },
    size = "md",
    border = true,
    background = "transparent",
  } = props ?? {};

  const {
    sourceValue,
    previewSrc,
    fileRef,
    handleFileChange,
    handleConfirm,
    handleRevert,
    isDirty,
  } = useImageUpload(image.src);

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">
        Capsule
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

      {/* Variant (read-only for now) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Variant</label>
        <input
          type="text"
          name={`${path}.variant`}
          defaultValue={variant}
          disabled
          className="rounded-md border bg-gray-50 px-3 py-2 text-sm text-gray-500"
        />
      </div>

      {/* Image */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Image</label>

        <input
          type="hidden"
          name={`${path}.props.image.src`}
          value={sourceValue}
        />

        {/* Preview */}
        <div className="space-y-2">
          <label className="text-xs font-medium">Preview</label>

          <div className="relative w-full overflow-hidden rounded-md border bg-gray-50">
            <Image
              src={previewSrc as string}
              alt={image.alt}
              width={400}
              height={400}
              className={`w-full h-auto object-cover`}
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
      </div>

      {/* Alt */}
      <div>
        <label className="text-xs font-medium">Image alternate text</label>
        <input
          type="text"
          name={`${path}.props.image.alt`}
          defaultValue={image.alt ?? ""}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* Size */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Size</label>
        <select
          name={`${path}.props.size`}
          defaultValue={size}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>

      {/* Background */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Background</label>
        <select
          name={`${path}.props.background`}
          defaultValue={background}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="transparent">Transparent</option>
          <option value="surface">Surface</option>
          <option value="page">Page</option>
        </select>
      </div>

      {/* Border */}
      <div className="flex items-center gap-2">
        <input type="hidden" name={`${path}.props.border`} value="false" />

        <input
          type="checkbox"
          name={`${path}.props.border`}
          value="true"
          defaultChecked={!!border}
          className="h-4 w-4"
        />
        <label className="text-xs font-medium text-gray-600">Show border</label>
      </div>
    </div>
  );
};

export default CapsuleEditor;
