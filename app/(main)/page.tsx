import { Suspense } from "react";
import MainScrollView from "../../ui/main-scroll-view";
import SkeletonGrid from "../../ui/skeletongrid";
import { getAllImg } from "../../lib/cloudinary";
import { ErrorTest } from "../../components/error/ErrorTest";

async function ImagesSection() {
  const images = await getAllImg(); // API 라우트 우회, 직접 호출
  return <MainScrollView images={images} />;
}

export default function Main() {
  return <ErrorTest />;
}
