import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

/**
 * GET /api/admin/pages/:id
 * Returns a single page (admin only)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page id" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    const page = await db
      .collection(process.env.PAGES_COLLECTION!)
      .findOne({ _id: new ObjectId(id) });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...page,
      _id: page._id.toString(),
    });
  } catch (err) {
    console.error("GET /api/admin/pages/:id failed", err);
    return NextResponse.json({ error: "Failed to load page" }, { status: 500 });
  }
}
