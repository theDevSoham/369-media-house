import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1️⃣ Validate input
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    // 2️⃣ DB lookup
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    const admin = await db
      .collection(process.env.ADMIN_COLLECTION as string)
      .findOne({ email, role: "admin", isActive: true });

    // ❌ Avoid leaking which field failed
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 3️⃣ Password check
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    console.log(isValid)
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 4️⃣ Issue JWT
    const token = jwt.sign(
      {
        sub: admin._id.toString(),
        role: "admin",
      },
      process.env.ADMIN_JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    // 5️⃣ Set cookie
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/", // REQUIRED for proxy
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
