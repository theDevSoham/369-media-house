import { useRef, useState } from "react";

export function useImageUpload(initialSrc?: string) {
  const [sourceValue, setSourceValue] = useState<string | undefined>(
    initialSrc,
  );
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(initialSrc);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewSrc(previewUrl);
  };

  const handleConfirm = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/media/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();

    setSourceValue(data.url);
    setPreviewSrc(data.url);

    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRevert = () => {
    setPreviewSrc(sourceValue);
    if (fileRef.current) fileRef.current.value = "";
  };

  return {
    sourceValue,
    previewSrc,
    fileRef,
    handleFileChange,
    handleConfirm,
    handleRevert,
    isDirty: previewSrc !== sourceValue,
  };
}
