import React, { useState, useRef } from "react";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";

type PreviewProps = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    ratio?: "square" | "portrait" | "landscape" | "wide";
  };
  background?: "page" | "surface" | "card";
};

type TestimonialProps = {
  description: string; // 👈 REQUIRED for quote
  testimonial: {
    author: string;
    role: string;
    avatar?: string;
  };
  background?: "page" | "surface" | "card";
};

type Props = {
  component:
    | {
        key: string;
        name: "card";
        grid_span: number;
        variant: "preview";
        props: PreviewProps;
      }
    | {
        key: string;
        name: "card";
        grid_span: number;
        variant: "testimonial";
        props: TestimonialProps;
      };
  path: string;
};

const IMAGE_RATIO_OPTIONS = ["square", "portrait", "landscape", "wide"];
const BACKGROUND_OPTIONS = ["page", "surface", "card"];

const CardEditor: React.FC<Props> = ({ component, path }) => {
  const [variant, setVariant] = useState(component.variant);
  const props = component.props;

  const renderPropFields = (currentVariant: (typeof component)["variant"]) => {
    switch (currentVariant) {
      /* ───────── PREVIEW VARIANT ───────── */
      case "preview":
        const previewProps = props as PreviewProps;
        const previewImage = useImageUpload(
          component.variant === "preview"
            ? component.props.image?.src
            : undefined,
        );
        return (
          <>
            <div>
              <label className="block text-xs font-medium mb-1">Title</label>
              <input
                type="text"
                name={`${path}.props.title`}
                defaultValue={previewProps.title ?? ""}
                className="w-full rounded border px-2 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Description
              </label>
              <textarea
                name={`${path}.props.description`}
                defaultValue={previewProps.description ?? ""}
                rows={3}
                className="w-full rounded border px-2 py-1 text-sm"
              />
            </div>

            {/* Preview image */}
            {previewProps.image && (
              <div className="space-y-3 rounded border bg-white p-3">
                <p className="text-xs font-semibold text-gray-600">Image</p>

                {previewImage.previewSrc && (
                  <div className="relative overflow-hidden rounded-md border bg-gray-50">
                    <Image
                      src={previewImage.previewSrc}
                      alt={previewProps.image.alt}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <input
                  ref={previewImage.fileRef}
                  type="file"
                  accept="image/*"
                  onChange={previewImage.handleFileChange}
                  className="hidden"
                />

                <div className="flex gap-2">
                  {previewImage.isDirty ? (
                    <>
                      <button
                        type="button"
                        onClick={previewImage.handleConfirm}
                        className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={previewImage.handleRevert}
                        className="rounded-md border px-3 py-1.5 text-xs"
                      >
                        Revert
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => previewImage.fileRef.current?.click()}
                      className="rounded-md border px-3 py-1.5 text-xs"
                    >
                      Upload image
                    </button>
                  )}
                </div>

                {previewImage.isDirty && (
                  <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                    <p className="font-semibold">⚠ Important</p>
                    <p className="mt-1 leading-relaxed">
                      Uploading and confirming an image only updates the
                      preview.
                      <br />
                      <strong>The image is NOT saved yet.</strong>
                    </p>
                    <p className="mt-1 leading-relaxed">
                      To permanently set this image, you must click{" "}
                      <strong>Save</strong> or <strong>Publish</strong> on the
                      page.
                      <br />
                      If you leave this page without saving, the image will be
                      lost.
                    </p>
                  </div>
                )}

                <input
                  type="hidden"
                  name={`${path}.props.image.src`}
                  value={previewImage.sourceValue}
                />
              </div>
            )}
          </>
        );

      /* ───────── TESTIMONIAL VARIANT ───────── */
      case "testimonial":
        const testimonialProps = props as TestimonialProps;
        const avatarImage = useImageUpload(
          testimonialProps.testimonial?.avatar,
        );

        return (
          <>
            <div>
              <label className="block text-xs font-medium mb-1">Quote</label>
              <textarea
                name={`${path}.props.description`}
                defaultValue={testimonialProps.description ?? ""}
                rows={3}
                className="w-full rounded border px-2 py-1 text-sm"
              />
            </div>

            <div className="space-y-2 rounded border bg-white p-3">
              <div>
                <label className="block text-xs font-medium mb-1">
                  Testimonial Author
                </label>
                <input
                  type="text"
                  name={`${path}.props.testimonial.author`}
                  defaultValue={testimonialProps.testimonial?.author ?? ""}
                  className="w-full rounded border px-2 py-1 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Author Role
                </label>
                <input
                  type="text"
                  name={`${path}.props.testimonial.role`}
                  defaultValue={testimonialProps.testimonial?.role ?? ""}
                  className="w-full rounded border px-2 py-1 text-xs"
                />
              </div>

              <div className="space-y-3 rounded border bg-white p-3">
                <label className="block text-xs font-medium mb-1">
                  Author Avatar
                </label>

                {avatarImage.previewSrc && (
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-gray-50">
                    <Image
                      src={avatarImage.previewSrc}
                      alt={testimonialProps.testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <input
                  ref={avatarImage.fileRef}
                  type="file"
                  accept="image/*"
                  onChange={avatarImage.handleFileChange}
                  className="hidden"
                />

                <div className="flex gap-2">
                  {avatarImage.isDirty ? (
                    <>
                      <button
                        type="button"
                        onClick={avatarImage.handleConfirm}
                        className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={avatarImage.handleRevert}
                        className="rounded-md border px-3 py-1.5 text-xs"
                      >
                        Revert
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => avatarImage.fileRef.current?.click()}
                      className="rounded-md border px-3 py-1.5 text-xs"
                    >
                      Upload avatar
                    </button>
                  )}
                </div>

                {avatarImage.isDirty && (
                  <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                    <p className="font-semibold">⚠ Important</p>
                    <p className="mt-1 leading-relaxed">
                      Uploading and confirming an image only updates the
                      preview.
                      <br />
                      <strong>The image is NOT saved yet.</strong>
                    </p>
                    <p className="mt-1 leading-relaxed">
                      To permanently set this image, you must click{" "}
                      <strong>Save</strong> or <strong>Publish</strong> on the
                      page.
                      <br />
                      If you leave this page without saving, the image will be
                      lost.
                    </p>
                  </div>
                )}

                <input
                  type="hidden"
                  name={`${path}.props.testimonial.avatar`}
                  value={avatarImage.sourceValue}
                />
              </div>
            </div>
          </>
        );

      default:
        return <></>;
    }
  };

  return (
    <div className="space-y-4 rounded-md border bg-gray-50 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Card ({variant})</h3>

      {/* ───────── constant identity ───────── */}
      <input type="hidden" name={`${path}.name`} value="card" />

      {/* Key */}
      <div>
        <label className="block text-xs font-medium mb-1">Key</label>
        <input
          type="text"
          name={`${path}.key`}
          defaultValue={component.key}
          className="w-full rounded border px-2 py-1 text-sm"
        />
      </div>

      {/* Grid span */}
      <div>
        <label className="block text-xs font-medium mb-1">Grid span</label>
        <input
          type="number"
          min={1}
          name={`${path}.grid_span`}
          defaultValue={component.grid_span}
          className="w-full rounded border px-2 py-1 text-sm"
        />
      </div>

      {/* Variant */}
      <div>
        <label className="block text-xs font-medium mb-1">Variant</label>
        <select
          name={`${path}.variant`}
          value={variant}
          onChange={(e) =>
            setVariant(e.target.value as "preview" | "testimonial")
          }
          className="w-full rounded border px-2 py-1 text-sm"
        >
          <option value="preview">preview</option>
          <option value="testimonial">testimonial</option>
        </select>
      </div>

      {/* Background */}
      <div>
        <label className="block text-xs font-medium mb-1">Background</label>
        <select
          name={`${path}.props.background`}
          defaultValue={props.background ?? "page"}
          className="w-full rounded border px-2 py-1 text-sm"
        >
          {BACKGROUND_OPTIONS.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </div>

      {renderPropFields(variant)}
    </div>
  );
};

export default CardEditor;
