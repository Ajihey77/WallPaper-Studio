import ImagePreview from "../../../../ui/detail-image-preiew"; // 경로는 실제에 맞게 수정

export default async function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  return <ImagePreview id={params.id} />;
}
