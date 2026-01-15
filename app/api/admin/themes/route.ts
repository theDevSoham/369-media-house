// app/api/admin/themes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTheme } from "@/lib/theme"; // your existing function

export async function GET(req: NextRequest) {
  try {
    const theme = await getTheme({ slug: "default-theme" });

    if (!theme) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    return NextResponse.json(theme, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching theme:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 },
    );
  }
}
