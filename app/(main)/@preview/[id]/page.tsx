"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ImagePreview() {
  const { id } = useParams();

  return (
    <div>
      <Image src={} alt="미리보기" />
    </div>
  );
}
