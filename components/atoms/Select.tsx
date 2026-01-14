interface SelectProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ name, label, options, required }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium">
        {label} {required && "(required)"}
      </label>
    )}
    <select
      name={name}
      required={required}
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm"
    >
      <option value="">Select an option</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
