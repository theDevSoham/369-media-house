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

    const { name, email, phone, service, message } = body;

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

    // 🔹 TODO: Plug in DB / Email / CRM here
    // await sendEmail(...)
    // await saveToDatabase(...)

    console.log("📩 Contact Form Submission:", {
      name,
      email,
      phone,
      service,
      message,
    });

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
