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
        width: "200px",
        height: "200px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={src}
        alt="이미지"
        fill
        style={{ objectFit: "cover" }}
        priority={priority}
      />
    </div>
  );
}
