import Image from "next/image";
import { getImg } from "../../../../lib/cloudinary";

export default async function ImagePreview({
  params,
}: {
  params: { id: string };
}) {
  /**
   * next는 기본적으로 정적처리를 하는데 이 신성한 정적처리에
   * 값자기 동적처리를 하는 param을 가져오니까 next가 경고를 줌
   * 이거 정적 처리맞아?
   * 항상 정적 처리와 동적처리를 고려하기.
   * */
  const images = await getImg(params.id);
  return (
    <div>
      <Image src={images.secure_url} alt="미리보기" />
    </div>
  );
}
