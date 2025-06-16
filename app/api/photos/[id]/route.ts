import { NextResponse } from "next/server";
import { getImg } from "../../../../lib/cloudinary";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const result = await getImg(params.id);

  return NextResponse.json(result);
}
