import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-800">
          Admin
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/dashboard/pages"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Pages
          </Link>

          <Link
            href="/admin/dashboard/themes"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Themes
          </Link>

          <Link
            href="/admin/dashboard/settings"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
          © {new Date().getFullYear()}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
