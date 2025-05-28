import Image from "next/image";
import { getImg } from "../../../../lib/cloudinary";

export default async function ImagePreview({
  params,
}: {
  params: { id: string };
}) {
  const images = await getImg(params.id);
  return (
    <div>
      <Image src={images.secure_url} alt="미리보기" />
    </div>
  );
}
