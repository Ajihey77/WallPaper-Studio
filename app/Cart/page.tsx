"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { galaxyFrames, iphoneFrames } from "../../data/deviceFrames";
import ModelAside from "../../ui/product-aside";
import ProductPreview from "../../ui/product-preview";
import type { DeviceFrame, ModelType } from "../../types";
import { useCartStore } from "../../store/cartStore";

export default function Cart() {
  const { cartImg } = useCartStore();
  const [model, setModel] = useState<ModelType>("iphone");
  const [selectedFrame, setSelectedFrame] = useState(0);
  const frames: DeviceFrame[] =
    model === "iphone" ? iphoneFrames : galaxyFrames;
  const currentFrame: DeviceFrame = frames[selectedFrame];
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const displayScale = 0.6;
  const { previewWidth, previewHeight } = useMemo(
    () => ({
      previewWidth: currentFrame.width * displayScale,
      previewHeight: currentFrame.height * displayScale,
    }),
    [currentFrame.width, currentFrame.height]
  );

  // 현재 선택된 이미지 인덱스
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setSelectedFrame(0);
    setResultUrl(null);
  }, [model]);

  // 선택된 썸네일이 바뀌면 미리보기 이미지 동기화
  useEffect(() => {
    if (cartImg.length === 0) return;
    const img = cartImg[currentImageIndex];
    if (img) setResultUrl(img);
  }, [cartImg, currentImageIndex]);

  // 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Embla Carousel 세팅 (수평, dragFree)
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, loop: false });

  // 시간/날짜 문자열
  const { timeText, dateText } = useMemo(() => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    return {
      timeText: `${hours}:${minutes}`,
      dateText: `${months[currentTime.getMonth()]} ${currentTime.getDate()}일 ${
        days[currentTime.getDay()]
      }`,
    };
  }, [currentTime]);

  // 가로 스크롤 네비게이션 상태
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollNavState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollLeft(emblaApi.canScrollPrev());
    setCanScrollRight(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollNavState();
    emblaApi.on("select", updateScrollNavState);
    emblaApi.on("reInit", updateScrollNavState);
    return () => {
      emblaApi.off("select", updateScrollNavState);
      emblaApi.off("reInit", updateScrollNavState);
    };
  }, [emblaApi, updateScrollNavState]);

  const scrollByItem = (direction: 1 | -1) => {
    if (!emblaApi) return;
    if (direction === -1) emblaApi.scrollPrev();
    else emblaApi.scrollNext();
  };

  return (
    <div className="w-screen h-screen flex bg-white font-sans overflow-hidden">
      <div className="flex-none shrink-0 w-[280px]">
        <ModelAside
          model={model}
          selectedFrame={selectedFrame}
          setModel={setModel}
          setSelectedFrame={setSelectedFrame}
        />
      </div>

      <main className="flex-1 min-w-0 h-screen flex items-center justify-start pl-16">
        <ProductPreview
          previewWidth={previewWidth}
          previewHeight={previewHeight}
          resultUrl={resultUrl}
          model={model}
          timeText={timeText}
          dateText={dateText}
          currentFrame={currentFrame}
        />
      </main>
      <div className="flex-3 min-w-0 h-full flex flex-col py-8">

        {/* 스크롤 가능한 가로 리스트 (Embla + 네비게이션) */}
        <div className="relative flex-1">
          {/* 좌우 버튼 */}
          <button
            type="button"
            aria-label="이전으로"
            onClick={() => scrollByItem(-1)}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow ring-1 ring-black/5 p-2 text-gray-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="다음으로"
            onClick={() => scrollByItem(1)}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow ring-1 ring-black/5 p-2 text-gray-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full items-center px-10">
              {cartImg.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setResultUrl(cartImg[index] ?? null);
                      if (emblaApi) emblaApi.scrollTo(index);
                    }}
                    className={`flex-none cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? "ring-4 ring-blue-500  scale-90"
                        : "ring-2 ring-gray-200 hover:ring-blue-300 hover:scale-90 scale-80"
                    } rounded-[30px] overflow-hidden mr-1`}
                    style={{
                      width: `${previewWidth}px`,
                      height: `${previewHeight}px`,
                    }}
                  >
                    <img src={item} alt={"이미지"} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

             </div>
    </div>
  );
}
