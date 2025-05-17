"use client";

import Image from "next/image";
import arrow from "../ui/asset/image/arrow.svg";
import MainImageCard from "../ui/main-image-card";
import { useEffect, useRef } from "react";
import { UseScrollDirection } from "../hooks/use-scroll-direction";

export default function Main() {
  const { containerRef } = UseScrollDirection();
  //   onScrollDown: () => {
  //     if (
  //       currentY.current &&
  //       currentY.current?.scrollTop ===
  //         currentY.current?.scrollTop + currentY.current?.clientHeight
  //     )
  //       currentY.current?.scrollTo({
  //         top: currentY.current.scrollTop + currentY.current.clientHeight,
  //         behavior: "smooth",
  //       });
  //   },
  //   onScrollUp: () => {
  //     currentY.current?.scrollTo({
  //       top: currentY.current.scrollTop - currentY.current.clientHeight,
  //       behavior: "smooth",
  //     });
  //   },
  // });

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-row items-center justify-center gap-4 w-full h-full max-w-[1920px] max-h-[100vh] p-4">
        <div className="flex flex-col items-center justify-center gap-[4vh] h-full min-w-[53px]">
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
        </div>

        <div
          ref={containerRef}
          className="h-full bg-white flex flex-col justify-center overflow-y-scroll"
        >
          <div className="grid grid-cols-4 w-full auto-rows-[calc(92vh/3)] h-screen gap-4">
            {Array.from({ length: 48 }).map((_, i) => (
              <MainImageCard key={i} />
            ))}
          </div>
        </div>

        <div className="relative h-full w-auto max-w-[374px] aspect-[374/800] ml-4 flex items-center justify-center">
          <div className="w-full h-full rounded-[45px] border border-black bg-cover bg-center absolute inset-0 z-0" />

          <Image
            src={arrow}
            alt="화살표"
            className="absolute -left-12 -top-2 w-[155px] h-[53px] z-10"
          />
          <span className="z-10 text-[#ff0000] font-bold text-[1.5vw] font-['Anonymous_Pro'] whitespace-nowrap">
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
