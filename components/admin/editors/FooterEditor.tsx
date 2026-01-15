import React from "react";

type Props = {
  component: any;
  path: string;
};

const ICON_OPTIONS = ["instagram", "facebook", "twitter", "linkedin", "mail"];

const FooterEditor: React.FC<Props> = ({ component, path }) => {
  const props = component.props ?? {};
  const social = props.social ?? [];

  return (
    <div className="space-y-4 rounded-md border bg-gray-50 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Footer Settings</h3>

      {/* Variant */}
      <div>
        <label className="block text-xs font-medium mb-1">Variant</label>
        <input
          type="text"
          name={`${path}.variant`}
          defaultValue={component.variant ?? ""}
          className="w-full rounded border px-2 py-1 text-sm"
        />
      </div>

      {/* Copyright */}
      <div>
        <label className="block text-xs font-medium mb-1">Copyright Text</label>
        <textarea
          name={`${path}.props.copyright`}
          defaultValue={props.copyright ?? ""}
          rows={2}
          className="w-full rounded border px-2 py-1 text-sm"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-600">Social Links</p>

        {social.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-2 rounded border bg-white p-2"
          >
            {/* Label */}
            <div>
              <label className="block text-xs mb-1">Label</label>
              <input
                type="text"
                name={`${path}.props.social.${index}.label`}
                defaultValue={item.label}
                className="w-full rounded border px-2 py-1 text-xs"
              />
            </div>

            {/* Href */}
            <div>
              <label className="block text-xs mb-1">URL</label>
              <input
                type="text"
                name={`${path}.props.social.${index}.href`}
                defaultValue={item.href}
                className="w-full rounded border px-2 py-1 text-xs"
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-xs mb-1">Icon</label>
              <select
                name={`${path}.props.social.${index}.icon`}
                defaultValue={item.icon}
                className="w-full rounded border px-2 py-1 text-xs"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterEditor;
