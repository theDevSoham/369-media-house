"use client";

import React, { useEffect, useState } from "react";

type Settings = {
  siteName: string;
  siteTagline: string;
  logoUrl: string;
  faviconUrl: string;
  enableUserRegistration: boolean;
  defaultTheme: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) return;
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!settings) return;

    const target = e.target;

    let newValue: string | boolean;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      newValue = target.checked;
    } else {
      newValue = target.value;
    }

    setSettings({
      ...settings,
      [target.name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    alert("Settings saved!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold">Site Settings</h1>

      {/* Site Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Site Name</label>
        <input
          type="text"
          name="siteName"
          value={settings?.siteName}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Site Tagline */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tagline</label>
        <input
          type="text"
          name="siteTagline"
          value={settings?.siteTagline}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Logo URL */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Logo URL</label>
        <input
          type="text"
          name="logoUrl"
          value={settings?.logoUrl}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Enable user registration */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="enableUserRegistration"
          checked={settings?.enableUserRegistration}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label className="text-sm font-medium">Enable user registration</label>
      </div>

      {/* Default Theme */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Default Theme</label>
        <select
          name="defaultTheme"
          value={settings?.defaultTheme}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="default-theme">Default Theme</option>
          {/* add more themes if needed */}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Save Settings
      </button>
    </form>
  );
}
