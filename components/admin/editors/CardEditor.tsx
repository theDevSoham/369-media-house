import React from "react";

type Props = {
  component: any;
  path: string;
};

const IMAGE_RATIO_OPTIONS = ["square", "portrait", "landscape", "wide"];
const BACKGROUND_OPTIONS = ["page", "surface", "card"];

const CardEditor: React.FC<Props> = ({ component, path }) => {
  const { variant, props = {} } = component;

  return (
    <div className="space-y-4 rounded-md border bg-gray-50 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Card ({variant})</h3>

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

      {/* ================= PREVIEW CARD ================= */}
      {variant === "preview" && (
        <>
          {/* Title */}
          <div>
            <label className="block text-xs font-medium mb-1">Title</label>
            <input
              type="text"
              name={`${path}.props.title`}
              defaultValue={props.title ?? ""}
              className="w-full rounded border px-2 py-1 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <textarea
              name={`${path}.props.description`}
              defaultValue={props.description ?? ""}
              rows={3}
              className="w-full rounded border px-2 py-1 text-sm"
            />
          </div>

          {/* Image */}
          {props.image && (
            <div className="space-y-2 rounded border bg-white p-3">
              <p className="text-xs font-semibold text-gray-600">Image</p>

              <div>
                <label className="block text-xs mb-1">Source</label>
                <input
                  type="text"
                  name={`${path}.props.image.src`}
                  defaultValue={props.image.src}
                  className="w-full rounded border px-2 py-1 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Alt Text</label>
                <input
                  type="text"
                  name={`${path}.props.image.alt`}
                  defaultValue={props.image.alt}
                  className="w-full rounded border px-2 py-1 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">Image Ratio</label>
                <select
                  name={`${path}.props.image.ratio`}
                  defaultValue={props.image.ratio ?? "landscape"}
                  className="w-full rounded border px-2 py-1 text-xs"
                >
                  {IMAGE_RATIO_OPTIONS.map((ratio) => (
                    <option key={ratio} value={ratio}>
                      {ratio}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= TESTIMONIAL CARD ================= */}
      {variant === "testimonial" && (
        <>
          {/* Quote */}
          <div>
            <label className="block text-xs font-medium mb-1">Quote</label>
            <textarea
              name={`${path}.props.description`}
              defaultValue={props.description ?? ""}
              rows={3}
              className="w-full rounded border px-2 py-1 text-sm"
            />
          </div>

          {/* Testimonial */}
          <div className="space-y-2 rounded border bg-white p-3">
            <p className="text-xs font-semibold text-gray-600">Author</p>

            <div>
              <label className="block text-xs mb-1">Name</label>
              <input
                type="text"
                name={`${path}.props.testimonial.author`}
                defaultValue={props.testimonial?.author ?? ""}
                className="w-full rounded border px-2 py-1 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Role</label>
              <input
                type="text"
                name={`${path}.props.testimonial.role`}
                defaultValue={props.testimonial?.role ?? ""}
                className="w-full rounded border px-2 py-1 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Avatar URL</label>
              <input
                type="text"
                name={`${path}.props.testimonial.avatar`}
                defaultValue={props.testimonial?.avatar ?? ""}
                className="w-full rounded border px-2 py-1 text-xs"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardEditor;
