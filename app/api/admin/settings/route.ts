// /app/api/admin/settings/route.ts
import { NextResponse } from "next/server";

/**
 * Stubbed admin settings
 */
const stubSettings = {
  siteName: "My Website",
  siteDescription: "A sample website",
  enableDarkMode: true,
  defaultLanguage: "en",
  theme: "default-theme",
  emailNotifications: false,
};

export async function GET() {
  // Simulate a slight delay if needed
  // await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json(stubSettings);
}

export async function POST(req: Request) {
  const body = await req.json();

  // Here you would normally save to DB
  console.log("Received settings update:", body);

  // Respond with updated settings (stub)
  return NextResponse.json({ ...stubSettings, ...body });
}
