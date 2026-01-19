// app/api/admin/contacted/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    const contacted = await db
      .collection(process.env.CONTACTS_COLLECTION as string)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(contacted, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch contacted error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacted data" },
      { status: 500 },
    );
  }
}
