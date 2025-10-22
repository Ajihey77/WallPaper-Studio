import React from "react";
import arrow from "../ui/asset/image/arrow.svg";
import Image from "next/image";

export default function PhotoFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative h-[87vh] w-auto max-w-[300px] aspect-[374/800]  flex items-center justify-center">
      <Image
        src={arrow}
        alt="화살표"
        className="absolute -left-20 -top-2 w-[155px] h-[53px] z-10"
        width={155}
        height={53}
        style={{ height: 'auto' }} 
        priority={true}
      />
      <div
          className="rounded-[40px] border-4 border-black bg-gray-100 transition-all duration-300 shadow-2xl overflow-hidden 
          flex items-center justify-center"
          style={{ width: "300px", height: "87vh" }}
        >
        {children}
        </div>
      </div>
    </>
  );
}
