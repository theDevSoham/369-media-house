interface InputProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "number" | "password";
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  required,
}) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium">
        {label} {required && "(required)"}
      </label>
    )}
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-border-focus)]"
    />
  </div>
);

export default Input;
