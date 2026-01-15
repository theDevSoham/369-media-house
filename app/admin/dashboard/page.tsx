"use client";

import { useEffect, useState } from "react";

async function getPagesCount(): Promise<number> {
  const res = await fetch("/api/admin/pages", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch pages");
  const pages = await res.json();
  return pages.length;
}

async function getUsersCount(): Promise<number> {
  const res = await fetch("/api/admin/users", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const users = await res.json();
  return users.length;
}

async function getSystemStatus(): Promise<"OK" | "DOWN"> {
  const res = await fetch("/api/admin/status", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) return "DOWN";
  return "OK";
}

export default function AdminDashboard() {
  const [pagesCount, setPagesCount] = useState<number | null>(null);
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [status, setStatus] = useState<"OK" | "DOWN">("OK");

  useEffect(() => {
    async function fetchData() {
      try {
        const [pages, users, sysStatus] = await Promise.all([
          getPagesCount(),
          getUsersCount(),
          getSystemStatus(),
        ]);

        setPagesCount(pages);
        setUsersCount(users);
        setStatus(sysStatus);
      } catch (err) {
        console.error(err);
        setStatus("DOWN");
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Pages</h2>
          <p className="text-2xl font-bold">{pagesCount ?? "-"}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Users</h2>
          <p className="text-2xl font-bold">{usersCount ?? "-"}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Status</h2>
          <p
            className={`text-2xl font-bold ${
              status === "OK" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
