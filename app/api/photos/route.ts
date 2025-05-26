import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  console.log("🌐 Cloudinary API 호출");

  const result = await cloudinary.search
    .expression("folder:list/*")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();

  return NextResponse.json({ resources: result.resources });
}
