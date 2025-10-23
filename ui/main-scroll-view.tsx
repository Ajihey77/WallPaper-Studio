"use client";

import React, { useState } from "react";
import MainImageCard from "./main-image-card";
import { UseScrollDirection } from "../hooks/use-scroll-direction";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function MainScrollView({ images }: { images: any }) {
  const { containerRef } = UseScrollDirection();
  const { addImg } = useCartStore();

  const addCart = (url: string) => {
    addImg(url);
    console.log(url);
  };
  return (
    <div className="w-screen h-screen flex overflow-hidden translate-x-[-70px]">
      <div className="flex flex-row items-center justify-center gap-4 w-full h-full max-w-[1920px] max-h-[87vh] translate-x-[-70px]">
        <div className="flex flex-col items-center justify-center gap-[4vh] h-full min-w-[53px]">
          <Link href={"/Wishlist"}>
            <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full hover:bg-white hover:border-2 hover:border-black transition-all group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10.5 6H5l3.5-4.5 2.5 3 3.5-4.5L19 17Z" />{" "}
              </svg>
            </div>
          </Link>
          <Link href={"/Cart"}>
            <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full hover:bg-white hover:border-2 hover:border-black transition-all group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.73c.83 0 1.54-.5 1.84-1.22l3.24-7.59A.996.996 0 0 0 21 4H5.21L4.27 1.64A1.003 1.003 0 0 0 3.3 1H1v2h1.6l3.6 7.59-1.35 2.45C4.52 13.37 5.16 14 6 14h1.16ZM6.1 6h13.45l-2.76 6H8.53L6.1 6Z" />
              </svg>
            </div>
          </Link>
        </div>
        <div
          ref={containerRef}
          className="h-full bg-white flex flex-col justify-center overflow-x-scroll overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="grid grid-cols-5 w-max gap-4">
            {images.map(
              (
                img: { public_id: string; secure_url: string },
                index: number
              ) => (
                <div
                  key={img.public_id}
                  className="relative flex items-center justify-center"
                >
                  <Link href={`/?preview=${img.public_id}`}>
  <MainImageCard src={img.secure_url} priority={index < 2} />
</Link>
                  <div
                    onClick={() => addCart(img.secure_url)}
                    className="absolute bottom-2 right-2 bg-white/50 rounded-full p-2 shadow-md hover:bg-white transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      viewBox="0 0 24 24"
                      className="w-3 h-3 text-gray-700"
                    >
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.16 14h9.73c.83 0 1.54-.5 1.84-1.22l3.24-7.59A.996.996 0 0 0 21 4H5.21L4.27 1.64A1.003 1.003 0 0 0 3.3 1H1v2h1.6l3.6 7.59-1.35 2.45C4.52 13.37 5.16 14 6 14h1.16ZM6.1 6h13.45l-2.76 6H8.53L6.1 6Z" />
                    </svg>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* <PhotoFrame>
          <Image
            src={arrow}
            alt="화살표"
            className="absolute -left-12 -top-2 w-[155px] h-[53px] z-10"
          />
          <span className="z-10 font-bold text-[1.5vw] font-['Anonymous_Pro'] whitespace-nowrap">
            Please select a photo
          </span>
        </PhotoFrame> */}

        {/* <div className="flex flex-col items-center justify-center gap-[4vh] h-full min-w-[53px] ml-4">
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
          <div className="w-[53px] h-[53px] bg-[#d9d9d9]" />
        </div> */}
      </div>
    </div>
  );
}
