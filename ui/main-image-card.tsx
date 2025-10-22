import Image from "next/image";

export default function MainImageCard({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div
      style={{
        width: "180px",
        height: "180px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt="이미지"
        fill
        sizes="300px" 
        style={{ objectFit: "cover" }}
        priority={priority}
      />
    </div>
  );
}
