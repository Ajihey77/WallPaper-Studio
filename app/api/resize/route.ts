import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const width = 1179;
  const height = 2556;

  try {
    const resizedBuffer = await sharp(buffer)
      .resize(width, height, {
        fit: "cover",
        position: "center",
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .withMetadata()
      .toBuffer();

    return new NextResponse(resizedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Image processing failed" },
      { status: 500 }
    );
  }
}
