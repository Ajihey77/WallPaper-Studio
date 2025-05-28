import { NextResponse } from "next/server";
import { getAllImg } from "../../../lib/cloudinary";

export async function GET() {
  console.log("🌐 Cloudinary API 호출");
  const result = await getAllImg();
  return NextResponse.json({ resources: result });
}
