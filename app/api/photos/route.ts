import { v2 as cloudinary } from "cloudinary";
import { NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(res: NextApiResponse) {
  try {
    const { res } = await cloudinary.search
      .expression("folder:list/*")
      .execute();
  } catch {}
}
