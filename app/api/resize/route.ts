import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const width = parseInt(formData.get("width") as string);
  const height = parseInt(formData.get("height") as string);

  const buffer = Buffer.from(await file.arrayBuffer());

  const resized = await sharp(buffer).resize(width, height).jpeg().toBuffer();

  const base64 = resized.toString("base64");

  return NextResponse.json({
    src: `data:image/jpeg;base64,${base64}`,
  });
}
