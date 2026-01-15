type Props = {
  component: any;
  path: string;
};

export default function TypographyEditor({ component }: Props) {
  const { props } = component;

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium">Text</label>
        <textarea
          defaultValue={props.text}
          rows={3}
          className="w-full rounded-md border px-2 py-1 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium">Mode</label>
          <select
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

        <div>
          <label className="text-xs font-medium">Align</label>
          <select
            defaultValue={props.align}
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
