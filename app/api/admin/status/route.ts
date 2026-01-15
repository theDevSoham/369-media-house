// app/api/admin/status/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    // Quick ping to ensure DB is reachable
    await db.command({ ping: 1 });

    return NextResponse.json({ status: "OK" });
  } catch (err) {
    console.error("System status check failed:", err);
    return NextResponse.json({ status: "DOWN" }, { status: 500 });
  }
}
