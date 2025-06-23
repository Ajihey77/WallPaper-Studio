"use client";

import Image from "next/image";
import React from "react";
import MainImageCard from "./main-image-card";
import { UseScrollDirection } from "../hooks/use-scroll-direction";
import arrow from "../ui/asset/image/arrow.svg";
import Link from "next/link";

export default function MainScrollView({ images }: { images: any }) {
  const { containerRef } = UseScrollDirection();
  console.log(images);
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-4 w-full h-full max-w-[1920px] max-h-[87vh] ">
        <div className="flex flex-col items-center justify-center gap-[4vh] h-full min-w-[53px]">
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
        </div>
        <div
          ref={containerRef}
          className="h-full bg-white flex flex-col justify-center overflow-y-scroll"
        >
          <div className="grid grid-cols-4 w-full gap-4">
            {images.map(
              (
                img: { public_id: string; secure_url: string },
                index: number
              ) => (
                <Link key={img.public_id} href={`/${img.public_id}`}>
                  <div
                    key={img.public_id}
                    className="flex items-center justify-center"
                  >
                    <MainImageCard src={img.secure_url} priority={index < 2} />
                  </div>
                </Link>
              )
            )}
          </div>
        </div>

        <div className="relative h-full w-auto max-w-[374px] aspect-[374/800] ml-4 flex items-center justify-center">
          <div className="w-full h-full rounded-[45px] border border-black bg-cover bg-center absolute inset-0 z-0" />

          <Image
            src={arrow}
            alt="화살표"
            className="absolute -left-12 -top-2 w-[155px] h-[53px] z-10"
          />
          <span className="z-10 font-bold text-[1.5vw] font-['Anonymous_Pro'] whitespace-nowrap">
            Please select a photo
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-[4vh] h-full min-w-[53px] ml-4">
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
        </div>
      </div>
    </div>
  );
}
