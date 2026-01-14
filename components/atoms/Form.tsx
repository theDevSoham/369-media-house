"use client";

import React, { useRef, useState } from "react";
import List, { ListItem } from "../atoms/List";

interface FormProps {
  variant?: "stacked" | "inline";

  submitAction?: string; // 🔥 JSON-driven endpoint
  method?: "POST" | "GET";
  submitLabel?: string;
  clearFormAfterSubmit?: boolean;

  fields?: ListItem[];
}

const Form: React.FC<FormProps> = ({
  variant = "stacked",
  submitAction,
  method = "POST",
  submitLabel = "Submit",
  clearFormAfterSubmit = false,
  fields = [],
}) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!submitAction) {
      console.warn("Form submitAction not provided");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const res = await fetch(submitAction, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify(payload) : undefined,
      });

      const result = await res.json();
      console.log("Form response:", result);
      alert("Your data has been received!");

      // 🔹 hook for success toast / redirect later
    } catch (err) {
      console.error("Form submit failed:", err);
    } finally {
      setLoading(false);
      if (clearFormAfterSubmit) formRef?.current?.reset();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={
        variant === "stacked" ? "flex flex-col gap-6" : "flex flex-wrap gap-6"
      }
    >
      {/* Fields (List-driven, CMS-safe) */}
      <List items={fields} />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="self-start rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
      >
        {loading ? "Sending..." : submitLabel}
      </button>
    </form>
  );
};

export default Form;
