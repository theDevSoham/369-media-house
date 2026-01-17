// app/api/admin/media/upload/route.ts

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Cloudinary needs Node runtime (not Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file → buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload using stream (memory-safe)
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error("Image upload failed:", error);

    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
