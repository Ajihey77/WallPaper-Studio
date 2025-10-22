import Image from "next/image";
import PhotoFrame from "./main-photo-frame";

export default function ImagePreview({ secure_url }: { secure_url: string  }) {
  console.log(secure_url)
  return (
    <>
      <PhotoFrame>
        <Image
          src={secure_url}
          alt="미리보기"
          width={300}
          height={500}
        />
      </PhotoFrame>
    </>
  );
}
