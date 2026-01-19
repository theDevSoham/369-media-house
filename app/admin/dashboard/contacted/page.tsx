"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React, { useEffect, useState } from "react";

dayjs.extend(advancedFormat);

type ContactedEntry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  createdAt: string;
};

const MESSAGE_PREVIEW_LIMIT = 120;

export default function ContactedPage() {
  const [contacted, setContacted] = useState<ContactedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactedEntry | null>(
    null,
  );

  useEffect(() => {
    async function fetchAllContacted() {
      try {
        const res = await fetch("/api/admin/contacted");
        if (!res.ok) return;

        const data = await res.json();
        setContacted(data);
      } catch (err) {
        console.error("Failed to fetch contacted users", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllContacted();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedMessage(null);
    }

    if (selectedMessage) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedMessage]);

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading contacts…</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-lg font-semibold text-gray-800">Contacted Users</h1>

      {contacted.length === 0 ? (
        <div className="rounded-md border bg-gray-50 p-4 text-sm text-gray-500">
          No contact submissions found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-100 text-left text-xs font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {contacted.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">{item.service}</td>
                  <td className="px-4 py-3 max-w-md">
                    {item.message ? (
                      item.message.length <= MESSAGE_PREVIEW_LIMIT ? (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {item.message}
                        </p>
                      ) : (
                        <div className="flex items-start gap-2">
                          <p className="line-clamp-2 text-sm text-gray-700">
                            {item.message}
                          </p>
                          <button
                            onClick={() => setSelectedMessage(item)}
                            className="shrink-0 text-xs font-medium text-blue-600 hover:underline"
                          >
                            <span className="cursor-pointer text-xs text-blue-600 hover:underline">
                              Expand
                            </span>
                          </button>
                        </div>
                      )
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {dayjs(item.createdAt).format("Do MMM YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-xl rounded-lg bg-white shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Message from {selectedMessage.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {dayjs(selectedMessage.createdAt).format(
                    "Do MMM YYYY, h:mm A",
                  )}
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 px-5 py-4 text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedMessage.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedMessage.phone}
                </div>
                <div>
                  <span className="font-medium">Service:</span>{" "}
                  {selectedMessage.service}
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">
                {selectedMessage.message}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t px-5 py-3">
              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-md bg-gray-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
