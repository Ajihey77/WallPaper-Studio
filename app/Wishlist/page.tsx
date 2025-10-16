"use client";

import React, { useEffect, useMemo, useState } from "react";
import { galaxyFrames, iphoneFrames } from "../../data/deviceFrames";
import ModelAside from "../../ui/product-aside";
import AddPhoto from "../../ui/product-add-photo";
import ProductPreview from "../../ui/product-preview";
import type { DeviceFrame, ModelType } from "../../types";

export default function Wishlist() {
  const [model, setModel] = useState<ModelType>("iphone");
  const [selectedFrame, setSelectedFrame] = useState(0);
  const frames: DeviceFrame[] = model === "iphone" ? iphoneFrames : galaxyFrames;
  const currentFrame: DeviceFrame = frames[selectedFrame];
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const displayScale = 0.6;
  const { previewWidth, previewHeight } = useMemo(() => ({
    previewWidth: currentFrame.width * displayScale,
    previewHeight: currentFrame.height * displayScale,
  }), [currentFrame.width, currentFrame.height]);

  useEffect(() => {
    setSelectedFrame(0);
    setResultUrl(null);
  }, [model]);

  // 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      dateText: `${months[currentTime.getMonth()]} ${currentTime.getDate()}일 ${days[currentTime.getDay()]}`,
    };
  }, [currentTime]);

  return (
    <div className="w-screen h-screen flex bg-white font-sans overflow-hidden">
      <ModelAside
        model={model}
        selectedFrame={selectedFrame}
        setModel={setModel}
        setSelectedFrame={setSelectedFrame}
      />

      <main className="flex-1 h-screen flex items-center justify-center gap-12 px-8">
        <AddPhoto
          frame={currentFrame}
          displayScale={displayScale}
          onCropped={setResultUrl}
        />
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
    </div>
  );
}
