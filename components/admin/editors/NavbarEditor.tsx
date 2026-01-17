import React from "react";

type Props = {
  component: any;
  path: string;
};

const ACTIONS = ["sign_in", "sign_out"] as const;

const NavbarEditor: React.FC<Props> = ({ component, path }) => {
  const { props } = component;
  const { brandImage, brandText, navLinks = [] } = props;

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold">Brand</h4>

        <div>
          <label className="text-xs font-medium">Brand Image</label>
          <input
            name={`${path}.props.brandImage`}
            type="text"
            defaultValue={brandImage}
            className="w-full rounded-md border px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium">Brand Text</label>
          <input
            name={`${path}.props.brandText`}
            type="text"
            defaultValue={brandText}
            className="w-full rounded-md border px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* Nav Links */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Navigation Links</h4>

        {navLinks.map((link: any) => {
          const linkPath = `${path}.props.navLinks.${link.key}`;

          return (
            <div
              key={link.key}
              className="rounded-md border bg-[var(--color-bg-surface)] p-4 space-y-3"
            >
              {/* Type */}
              <div>
                <label className="text-xs font-medium">Type</label>
                <select
                  name={`${linkPath}.type`}
                  defaultValue={link.type}
                  className="w-full rounded-md border px-2 py-1 text-sm"
                >
                  <option value="normal">Normal Link</option>
                  <option value="button">Button</option>
                </select>
              </div>

              {/* Label */}
              <div>
                <label className="text-xs font-medium">Label</label>
                <input
                  name={`${linkPath}.label`}
                  type="text"
                  defaultValue={link.label}
                  className="w-full rounded-md border px-2 py-1 text-sm"
                />
              </div>

              {/* Normal link */}
              {link.type === "normal" && (
                <div>
                  <label className="text-xs font-medium">Route</label>
                  <input
                    name={`${linkPath}.link`}
                    type="text"
                    defaultValue={link.link}
                    className="w-full rounded-md border px-2 py-1 text-sm"
                  />
                </div>
              )}

              {/* Button action */}
              {link.type === "button" && (
                <div>
                  <label className="text-xs font-medium">Action</label>
                  <select
                    name={`${linkPath}.action`}
                    defaultValue={link.action}
                    className="w-full rounded-md border px-2 py-1 text-sm"
                  >
                    {ACTIONS.map((action) => (
                      <option key={action} value={action}>
                        {action}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}

        {/* Add placeholder UI */}
        <button
          type="button"
          className="w-full rounded-md border border-dashed px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card)]"
        >
          + Add Navigation Item
        </button>
      </div>
    </div>
  );
};

export default NavbarEditor;
