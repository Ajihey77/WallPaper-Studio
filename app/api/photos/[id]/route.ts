import { NextResponse } from "next/server";
import { getImg } from "../../../../lib/cloudinary";

export async function GET(
  request: Request,
  { params }: { params:Promise <{ id: string }> }
) {
  const {id} = await params
  const result = await getImg(id);

  return NextResponse.json(result);
}
