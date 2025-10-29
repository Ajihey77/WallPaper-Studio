import MainScrollView from "../../ui/main-scroll-view";
import { getAllImg } from "../../lib/cloudinary";

async function ImagesSection() {
  const images = await getAllImg(); // API 라우트 우회, 직접 호출
  return <MainScrollView images={images} />;
}

export default function Main() {
  return <ImagesSection />;
}
