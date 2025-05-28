import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function getAllImg() {
  const result = await cloudinary.search
    .expression("folder:list/*")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();
  return result.resources;
}

export async function getImg(id: string) {
  const result = await cloudinary.search
    .expression(`public_id=${id}`)
    .max_results(1)
    .execute();
  return result.resources[0];
}
