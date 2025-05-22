import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:list/*")
      .sort_by("created_at", "desc")
      .max_results(30)
      .execute();

    return NextResponse.json({ images: result.resources });
  } catch (err) {
    return NextResponse.json(
      { error: "Cloudinary fetch failed", detail: err },
      { status: 500 }
    );
  }
}
