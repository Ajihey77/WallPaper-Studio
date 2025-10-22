import ImagePreview from "../../../ui/main-detail-image-preiew";
import { getImg } from "../../../lib/cloudinary";
import ModalDefault from "./default";

export default async function PreviewPage({
  searchParams
}: {
  searchParams: Promise<{ preview?: string }>
}) {
  const { preview } = await searchParams;
  
  console.log("🔍 Preview Debug:");
  console.log("- searchParams:", await searchParams);
  console.log("- preview value:", preview);
  
  if (!preview) {
    console.log("❌ No preview param, showing default");
    return <ModalDefault />;
  }
  
  console.log("🔍 Fetching image for:", decodeURIComponent(preview));
  const image = await getImg(decodeURIComponent(preview));
  console.log("- Image result:", image);
  
  if (!image?.secure_url) {
    console.log("❌ No image found, showing default");
    return <ModalDefault />;
  }
  
  console.log("✅ Showing image preview");
  return <ImagePreview secure_url={image.secure_url} />;
}