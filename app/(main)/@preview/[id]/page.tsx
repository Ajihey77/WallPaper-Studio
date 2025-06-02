import Image from "next/image";
import { getAllImg, getImg } from "../../../../lib/cloudinary";

// 정적으로 미리 생성하기 위한 설정
export const dynamicParams = false;

// 빌드시점에 모든 페이지를 미리 생성하여 동적 라우팅을 정적으로 처리한다.
export async function generateStaticParams() {
  const images = await getAllImg();
  console.log(
    "빌드시 정적으로 생성되는 id 목록:",
    images.map((img: any) => img.public_id)
  );

  return images.map((img: any) => ({ id: img.public_id }));
}

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
