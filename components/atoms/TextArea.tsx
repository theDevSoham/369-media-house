interface TextareaProps {
  name: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  rows = 4,
  placeholder,
  required,
}) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium">
        {label} {required && "(required)"}
      </label>
    )}
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-border-focus)]"
    />
  </div>
);

export default Textarea;
