import clientPromise from "@/lib/mongodb";
import { sanitizeText, validateEmail, validatePhone } from "@/lib/validator";
import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    const name = sanitizeText(body.name);
    const email = body.email?.toLowerCase().trim();
    const phone = sanitizeText(body.phone);
    const service = sanitizeText(body.service);
    const message = sanitizeText(body.message);

    // Basic validation (keep frontend & backend aligned)
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    // ─── Validations ───
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number" },
        { status: 400 },
      );
    }

    // 🔹 TODO: Plug in DB / Email / CRM here
    // await sendEmail(...)
    // await saveToDatabase(...)

    // ─── Database insert ───
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE_NAME);

    await db.collection(process.env.CONTACTS_COLLECTION as string).insertOne({
      name,
      email,
      phone,
      service,
      message,
      metadata: {
        ip: req.headers.get("x-forwarded-for") ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
      },
      createdAt: new Date(),
    });

    // console.log("📩 Contact Form Submission:", {
    //   name,
    //   email,
    //   phone,
    //   service,
    //   message,
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid request payload",
      },
      { status: 500 },
    );
  }
}
