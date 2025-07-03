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
      <div className="relative h-[87vh] w-auto max-w-[300px] aspect-[374/800] ml-4 flex items-center justify-center">
        <div className="w-full h-full rounded-[45px] border border-black bg-cover bg-center absolute inset-0 z-0" />
        <Image
          src={arrow}
          alt="화살표"
          className="absolute -left-12 -top-2 w-[155px] h-[53px] z-10"
        />
        {children}
      </div>
    </>
  );
}
