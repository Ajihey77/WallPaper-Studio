import { v2 as cloudinary } from "cloudinary";
import MainScrollView from "../ui/main-scroll-view";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

async function getImages() {
  console.log("🌐 Cloudinary API 호출");
  const result = await cloudinary.search
    .expression("folder:list/*")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();
  return result.resources;
}

export default async function Main() {
  const images = await getImages();
  return <MainScrollView images={images} />;
}
