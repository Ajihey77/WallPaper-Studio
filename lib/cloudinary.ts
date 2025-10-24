import { v2 as cloudinary } from "cloudinary";
import { unstable_cache } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const imageCache = new Map<string, any>();

export const getAllImg = unstable_cache(
  async () => {
    const result = await cloudinary.search
      .expression("folder:list/*")
      .sort_by("created_at", "desc")
      .max_results(30)
      .execute();

    result.resources.forEach((img: any) => {
      imageCache.set(img.public_id, img);
    });
    return result.resources;
  },
  ["all-images"],
  {
    revalidate: 3600,
    tags: ["images"],
  }
);

// export async function getAllImg() {
//   const result = await cloudinary.search
//     .expression("folder:list/*")
//     .sort_by("created_at", "desc")
//     .max_results(30)
//     .execute();
//   return result.resources;
// }

// lib/cloudinary.ts
export async function getImg(id: string) {
  try {
    console.log("🔍 Searching for public_id:", id);
    const result = await cloudinary.search
      .expression(`public_id="${id}"`) // 따옴표 추가
      .max_results(1)
      .execute();

    console.log("🔍 Search result:", result);
    console.log("🔍 Resources found:", result.resources?.length || 0);

    return result.resources?.[0] || null;
  } catch (error) {
    console.error("❌ Cloudinary search error:", error);
    return null;
  }
}
