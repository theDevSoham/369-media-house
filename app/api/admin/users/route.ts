// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    const users = await db.collection(process.env.ADMIN_COLLECTION as string).find({}).toArray();

    // Only return minimal info for stats
    const userList = users.map((u) => ({
      _id: u._id,
      email: u.email,
      name: u.name,
    }));

    return NextResponse.json(userList);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
