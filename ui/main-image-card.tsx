import Image from "next/image";

export default function MainImageCard({ src }: { src: string }) {
  return <Image src={src} alt="이미지" />;
}
