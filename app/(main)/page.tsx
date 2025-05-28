import MainScrollView from "../../ui/main-scroll-view";

async function getImages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/photos`);

  if (!res.ok) throw new Error("이미지 로딩 실패");
  const data = await res.json();
  return data.resources;
}

export default async function Main() {
  const images = await getImages();
  console.log(images);
  return <MainScrollView images={images} />;
}
