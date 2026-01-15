import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/**
 * GET /api/admin/pages
 * Returns all website pages (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    const pages = await db
      .collection(process.env.PAGES_COLLECTION!)
      .find(
        {},
        {
          projection: {
            name: 1,
            slug: 1,
            route: 1,
            status: 1,
            updatedAt: 1,
          },
        },
      )
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json(
      pages.map((p) => ({
        _id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        route: p.route,
        status: p.status,
        updatedAt: p.updatedAt,
      })),
    );
  } catch (err) {
    console.error("GET /api/admin/pages failed", err);
    return NextResponse.json(
      { error: "Failed to load pages" },
      { status: 500 },
    );
  }
}
