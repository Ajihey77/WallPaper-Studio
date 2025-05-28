import { NextResponse } from "next/server";
import { getImg } from "../../../../lib/cloudinary";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("🌐 Cloudinary API 호출");

  const result = await getImg(params.id);

  return NextResponse.json(result);
}
