// app/admin/dashboard/pages/page.tsx
import Link from "next/link";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

type Page = {
  _id: string;
  name: string;
  slug: string;
  route: string;
  status: "draft" | "published";
  updatedAt: string;
};

async function getPages(): Promise<Page[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/pages`,
    {
      cache: "no-store",
      credentials: "include", // 🔐 send cookies
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }

  const response = await res.json()
  return response;
}

export default async function WebsitePages() {
  const pages = await getPages();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Website Pages</h1>
          <p className="text-sm text-gray-500">
            Manage routes, SEO and publishing status
          </p>
        </div>

        <Link
          href="/admin/dashboard/pages/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          + New Page
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Route</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last Updated</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No pages created yet
                </td>
              </tr>
            )}

            {pages.map((page) => (
              <tr key={page._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{page.name}</td>

                <td className="px-4 py-3 text-gray-600">{page.route}</td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium
                      ${
                        page.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {page.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {dayjs(page.updatedAt).format("Do MMM YYYY")}
                </td>

                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/dashboard/pages/${page._id}`}
                    className="text-sm font-medium text-blue-600 hover:underline px-3"
                  >
                    Edit
                  </Link>

                  <Link
                    href={`/admin/dashboard/pages/${page._id}`}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
