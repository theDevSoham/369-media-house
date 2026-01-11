"use client";

import Image from "next/image";
import React from "react";

type FieldConfig =
  | {
      type: "input";
      name: string;
      label: string;
      inputType?: "text" | "email" | "number" | "password";
      placeholder?: string;
      required?: boolean;
    }
  | {
      type: "textarea";
      name: string;
      label: string;
      placeholder?: string;
      rows?: number;
      required?: boolean;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
      required?: boolean;
    };

const renderField = (field: FieldConfig) => {
  const baseClass =
    "rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-border-focus)]";

  switch (field.type) {
    case "input":
      return (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            {field.label} {`${field.required ? "(required)" : ""}`}
          </label>
          <input
            name={field.name}
            type={field.inputType ?? "text"}
            placeholder={field.placeholder}
            required={field.required}
            className={baseClass}
          />
        </div>
      );

    case "textarea":
      return (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            {field.label} {`${field.required ? "(required)" : ""}`}
          </label>
          <textarea
            name={field.name}
            rows={field.rows ?? 4}
            placeholder={field.placeholder}
            required={field.required}
            className={baseClass}
          />
        </div>
      );

    case "select":
      return (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            {field.label} {`${field.required ? "(required)" : ""}`}
          </label>
          <select
            name={field.name}
            required={field.required}
            className={baseClass}
          >
            <option value="">Select an option</option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      return null;
  }
};

interface FormProps {
  variant: "stacked";
  heading?: string;
  description?: string;
  image?: string;
  extra?: Array<{
    label: string;
    id: string;
    value: string;
    type: "phone" | "mail";
  }>;
  fields?: FieldConfig[];
  submit?: string;
}

const Form: React.FC<FormProps> = ({
  variant,
  heading,
  description,
  fields = [],
  image,
  extra,
  submit,
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Option 1: Log entries directly
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Option 2: Convert to plain object (most useful)
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  const renderContact = (contact: {
    label: string;
    id: string;
    value: string;
    type: "phone" | "mail";
  }) => {
    switch (contact.type) {
      case "mail":
        return <a href={`mailto:${contact.value}`}>{contact.label}</a>;

      case "phone":
        return <a href={`tel:${contact.value}`}>{contact.label}</a>;

      default:
        return null;
    }
  };

  switch (variant) {
    case "stacked":
      return (
        <section className="w-full">
          <form
            onSubmit={onSubmit}
            className="mx-auto grid max-w-4xl grid-cols-1 md:gap-24 gap-16 rounded-[var(--radius-lg)] p-6 md:grid-cols-2 md:p-8"
          >
            {/* Left */}
            {(heading || description) && (
              <div className="flex flex-col justify-around gap-3 text-center md:text-left">
                {heading && (
                  <div className="flex justify-center">
                    <div className="rounded-full bg-[var(--color-bg-surface)] py-3 px-12">
                      <h3 className="font-sans text-lg md:text-2xl font-bold text-center">
                        {heading}
                      </h3>
                    </div>
                  </div>
                )}
                {description && (
                  <p className="text-sm lg:text-xl">{description}</p>
                )}
                {image && (
                  <div className="w-full aspect-1 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)]">
                    <Image
                      src={image}
                      alt={heading ?? "Form image"}
                      className="h-full w-full object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                )}

                {/* Extras */}
                {extra && extra.length > 0 && (
                  <ul className="flex flex-wrap justify-center gap-3 md:justify-start">
                    {extra.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-xs font-medium"
                      >
                        {renderContact(item)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Right */}
            <div className="flex flex-col gap-4">
              {fields.map(renderField)}

              <button
                type="submit"
                className="mt-2 self-start rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-medium hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] text-[var(--color-text-inverse)]"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      );

    default:
      return null;
  }
};

export default Form;
