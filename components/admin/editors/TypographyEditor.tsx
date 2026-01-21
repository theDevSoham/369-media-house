type Props = {
  component: {
    key: string;
    name: "typography";
    is_contained?: boolean;
    props: {
      mode: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
      text: string;
      align?: "left" | "center" | "right";
    };
  };
  path: string;
};

export default function TypographyEditor({ component, path }: Props) {
  const { key, name, is_contained, props } = component;

  return (
    <div className="space-y-3">
      {/* 🔒 Static bindings */}

      <input type="hidden" name={`${path}.name`} value={name} />

      {/* Key */}
      <div>
        <label className="text-xs font-medium">Key</label>
        <input
          name={`${path}.key`}
          defaultValue={key}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      {/* is contained */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium">Contained</label>

        {/* ensures false is sent when unchecked */}
        <input type="hidden" name={`${path}.is_contained`} value="false" />

        <input
          type="checkbox"
          name={`${path}.is_contained`}
          value="true"
          defaultChecked={!!is_contained}
          className="h-4 w-4"
        />
      </div>

      {/* Text */}
      <div>
        <label className="text-xs font-medium">Text</label>
        <textarea
          name={`${path}.props.text`}
          defaultValue={props.text}
          rows={3}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Mode */}
        <div>
          <label className="text-xs font-medium">Mode</label>
          <select
            name={`${path}.props.mode`}
            defaultValue={props.mode}
            className="w-full rounded-md border px-2 py-1 text-sm"
          >
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
            <option value="p">Paragraph</option>
          </select>
        </div>

        {/* Align */}
        <div>
          <label className="text-xs font-medium">Align</label>
          <select
            name={`${path}.props.align`}
            defaultValue={props.align ?? "center"}
            className="w-full rounded-md border px-2 py-1 text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    </div>
  );
}
