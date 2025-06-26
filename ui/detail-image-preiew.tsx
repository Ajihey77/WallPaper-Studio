"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PhotoFrame from "./photo-frame";

export default function ImagePreview({ id }: { id: string }) {
  const [image, setImage] = useState<{ secure_url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/photos/${id}`);
        if (!res.ok) throw new Error("이미지를 불러오지 못했습니다.");
        const data = await res.json();
        setImage(data);
      } catch (err) {
        console.error(err);
        setError("이미지를 불러오는 데 실패했습니다.");
      }
    };

    fetchImage();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!image) return <p>로딩 중...</p>;

  return (
    <>
      <PhotoFrame>
        <Image src={image.secure_url} alt="미리보기" width={300} height={500} />
      </PhotoFrame>
    </>
  );
}
