"use client";
/**
 * Parallel Routes 와 SSR을 동시에 쓰다 문제 발생
 * 각각의 사용목적을 이해하고 생각했어야한다.
 */
import Image from "next/image";
import { getAllImg, getImg } from "../../../../lib/cloudinary";
import { useEffect, useState } from "react";

// 정적으로 미리 생성하기 위한 설정
// export const dynamicParams = false;

// 빌드시점에 모든 페이지를 미리 생성하여 동적 라우팅을 정적으로 처리한다.
// export async function generateStaticParams() {
//   const images = await getAllImg();
//   console.log(
//     "빌드시 정적으로 생성되는 id 목록:",
//     images.map((img: any) => img.public_id)
//   );

//   return images.map((img: any) => ({ id: img.public_id }));
// }

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
  // const images = await getImg(params.id);
  const [image, setImage] = useState<{ secure_url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/get-img?id=${params.id}`);
        if (!res.ok) throw new Error("이미지를 불러오지 못했습니다.");
        const data = await res.json();
        setImage(data);
      } catch (err) {
        console.error(err);
        setError("이미지를 불러오는 데 실패했습니다.");
      }
    };

    fetchImage();
  }, [params.id]);

  if (error) return <p>{error}</p>;
  if (!image) return <p>로딩 중...</p>;

  return (
    <div>
      <Image src={image.secure_url} alt="미리보기" width={500} height={500} />
    </div>
  );
}
