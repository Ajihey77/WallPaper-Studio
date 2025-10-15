"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { galaxyFrames, iphoneFrames } from "../../data/deviceFrames";

export default function Wishlist() {
  const [model, setModel] = useState<"iphone" | "galaxy">("iphone");
  const [selectedFrame, setSelectedFrame] = useState(0);
  const frames = model === "iphone" ? iphoneFrames : galaxyFrames;
  const currentFrame = frames[selectedFrame];
  const aspectRatio = currentFrame.width / currentFrame.height;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const displayScale = 0.6;
  const previewWidth = currentFrame.width * displayScale;
  const previewHeight = currentFrame.height * displayScale;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setResultUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const drawCanvas = (img: HTMLImageElement, crop: typeof cropArea) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.beginPath();
    ctx.rect(crop.x, crop.y, crop.width, crop.height);
    ctx.clip();
    ctx.clearRect(crop.x, crop.y, crop.width, crop.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);

    const handleSize = 12;
    ctx.fillStyle = "#3b82f6";

    const corners = [
      { x: crop.x, y: crop.y },
      { x: crop.x + crop.width, y: crop.y },
      { x: crop.x, y: crop.y + crop.height },
      { x: crop.x + crop.width, y: crop.y + crop.height },
    ];

    const edges = [
      { x: crop.x + crop.width / 2, y: crop.y },
      { x: crop.x + crop.width / 2, y: crop.y + crop.height },
      { x: crop.x, y: crop.y + crop.height / 2 },
      { x: crop.x + crop.width, y: crop.y + crop.height / 2 },
    ];

    [...corners, ...edges].forEach((handle) => {
      ctx.fillRect(
        handle.x - handleSize / 2,
        handle.y - handleSize / 2,
        handleSize,
        handleSize
      );
    });
  };

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const img = new Image();

    img.onload = () => {
      imageRef.current = img;
      canvas.width = previewWidth;
      canvas.height = previewHeight;
      const newCrop = initializeCropArea(canvas);
      setCropArea(newCrop);
      drawCanvas(img, newCrop);
    };

    img.src = imageSrc;
  }, [imageSrc, previewWidth, previewHeight, aspectRatio]);

  const getHandleAtPosition = (x: number, y: number) => {
    const handleSize = 12;
    const threshold = handleSize;

    const corners = [
      { x: cropArea.x, y: cropArea.y, handle: "nw" },
      { x: cropArea.x + cropArea.width, y: cropArea.y, handle: "ne" },
      { x: cropArea.x, y: cropArea.y + cropArea.height, handle: "sw" },
      {
        x: cropArea.x + cropArea.width,
        y: cropArea.y + cropArea.height,
        handle: "se",
      },
    ];

    for (const corner of corners) {
      if (
        Math.abs(x - corner.x) < threshold &&
        Math.abs(y - corner.y) < threshold
      ) {
        return corner.handle;
      }
    }

    const edges = [
      { x: cropArea.x + cropArea.width / 2, y: cropArea.y, handle: "n" },
      {
        x: cropArea.x + cropArea.width / 2,
        y: cropArea.y + cropArea.height,
        handle: "s",
      },
      { x: cropArea.x, y: cropArea.y + cropArea.height / 2, handle: "w" },
      {
        x: cropArea.x + cropArea.width,
        y: cropArea.y + cropArea.height / 2,
        handle: "e",
      },
    ];

    for (const edge of edges) {
      if (
        Math.abs(x - edge.x) < threshold &&
        Math.abs(y - edge.y) < threshold
      ) {
        return edge.handle;
      }
    }

    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      return "move";
    }

    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const handle = getHandleAtPosition(x, y);

    if (handle === "move") {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    } else if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isDragging && !isResizing) {
      const handle = getHandleAtPosition(x, y);
      if (handle === "move") {
        canvas.style.cursor = "move";
      } else if (handle === "nw" || handle === "se") {
        canvas.style.cursor = "nwse-resize";
      } else if (handle === "ne" || handle === "sw") {
        canvas.style.cursor = "nesw-resize";
      } else if (handle === "n" || handle === "s") {
        canvas.style.cursor = "ns-resize";
      } else if (handle === "w" || handle === "e") {
        canvas.style.cursor = "ew-resize";
      } else {
        canvas.style.cursor = "default";
      }
    }

    if (isDragging) {
      const newX = Math.max(
        0,
        Math.min(x - dragStart.x, canvas.width - cropArea.width)
      );
      const newY = Math.max(
        0,
        Math.min(y - dragStart.y, canvas.height - cropArea.height)
      );

      const newCrop = { ...cropArea, x: newX, y: newY };
      setCropArea(newCrop);
      drawCanvas(imageRef.current, newCrop);
    } else if (isResizing) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;

      let newCrop = { ...cropArea };

      switch (resizeHandle) {
        case "se":
          const newWidth1 = Math.max(50, cropArea.width + dx);
          const newHeight1 = newWidth1 / aspectRatio;
          if (
            cropArea.x + newWidth1 <= canvas.width &&
            cropArea.y + newHeight1 <= canvas.height
          ) {
            newCrop.width = newWidth1;
            newCrop.height = newHeight1;
          }
          break;
        case "sw":
          const newWidth2 = Math.max(50, cropArea.width - dx);
          const newHeight2 = newWidth2 / aspectRatio;
          if (
            cropArea.x + dx >= 0 &&
            cropArea.y + newHeight2 <= canvas.height
          ) {
            newCrop.x = cropArea.x + dx;
            newCrop.width = newWidth2;
            newCrop.height = newHeight2;
          }
          break;
        case "ne":
          const newWidth3 = Math.max(50, cropArea.width + dx);
          const newHeight3 = newWidth3 / aspectRatio;
          if (
            cropArea.x + newWidth3 <= canvas.width &&
            cropArea.y - (newHeight3 - cropArea.height) >= 0
          ) {
            newCrop.y = cropArea.y + cropArea.height - newHeight3;
            newCrop.width = newWidth3;
            newCrop.height = newHeight3;
          }
          break;
        case "nw":
          const newWidth4 = Math.max(50, cropArea.width - dx);
          const newHeight4 = newWidth4 / aspectRatio;
          if (
            cropArea.x + dx >= 0 &&
            cropArea.y - (newHeight4 - cropArea.height) >= 0
          ) {
            newCrop.x = cropArea.x + dx;
            newCrop.y = cropArea.y + cropArea.height - newHeight4;
            newCrop.width = newWidth4;
            newCrop.height = newHeight4;
          }
          break;
        case "e":
        case "w":
          const widthChange = resizeHandle === "e" ? dx : -dx;
          const newWidth = Math.max(50, cropArea.width + widthChange);
          const newHeight = newWidth / aspectRatio;
          const heightDiff = (newHeight - cropArea.height) / 2;

          if (
            (resizeHandle === "e"
              ? cropArea.x + newWidth <= canvas.width
              : cropArea.x + (cropArea.width - newWidth) >= 0) &&
            cropArea.y - heightDiff >= 0 &&
            cropArea.y + cropArea.height + heightDiff <= canvas.height
          ) {
            newCrop.x =
              resizeHandle === "e"
                ? cropArea.x
                : cropArea.x + (cropArea.width - newWidth);
            newCrop.y = cropArea.y - heightDiff;
            newCrop.width = newWidth;
            newCrop.height = newHeight;
          }
          break;
        case "n":
        case "s":
          const heightChange = resizeHandle === "s" ? dy : -dy;
          const newHeight5 = Math.max(
            50 / aspectRatio,
            cropArea.height + heightChange
          );
          const newWidth5 = newHeight5 * aspectRatio;
          const widthDiff = (newWidth5 - cropArea.width) / 2;

          if (
            (resizeHandle === "s"
              ? cropArea.y + newHeight5 <= canvas.height
              : cropArea.y + (cropArea.height - newHeight5) >= 0) &&
            cropArea.x - widthDiff >= 0 &&
            cropArea.x + cropArea.width + widthDiff <= canvas.width
          ) {
            newCrop.x = cropArea.x - widthDiff;
            newCrop.y =
              resizeHandle === "s"
                ? cropArea.y
                : cropArea.y + (cropArea.height - newHeight5);
            newCrop.width = newWidth5;
            newCrop.height = newHeight5;
          }
          break;
      }

      setCropArea(newCrop);
      setDragStart({ x, y });
      drawCanvas(imageRef.current, newCrop);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle("");
  };

  const handleReset = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const newCrop = initializeCropArea(canvas);
    setCropArea(newCrop);
    drawCanvas(imageRef.current, newCrop);
  };

  const initializeCropArea = (canvas: HTMLCanvasElement) => {
    let cropWidth = canvas.width;
    let cropHeight = cropWidth / aspectRatio;

    if (cropHeight > canvas.height) {
      cropHeight = canvas.height;
      cropWidth = cropHeight * aspectRatio;
    }

    const x = (canvas.width - cropWidth) / 2;
    const y = (canvas.height - cropHeight) / 2;

    return { x, y, width: cropWidth, height: cropHeight };
  };

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const img = imageRef.current;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = currentFrame.width;
    tempCanvas.height = currentFrame.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    const scaleX = img.width / canvas.width;
    const scaleY = img.height / canvas.height;

    const sourceX = cropArea.x * scaleX;
    const sourceY = cropArea.y * scaleY;
    const sourceWidth = cropArea.width * scaleX;
    const sourceHeight = cropArea.height * scaleY;

    tempCtx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      currentFrame.width,
      currentFrame.height
    );

    tempCanvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
      },
      "image/jpeg",
      0.95
    );
  };

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

  // 시간 포맷
  const formatTime = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    return { hours, minutes };
  };

  const formatDate = () => {
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
    return `${months[currentTime.getMonth()]} ${currentTime.getDate()}일 ${
      days[currentTime.getDay()]
    }`;
  };

  const HomeIcon = ({
    size = 24,
    color = "currentColor",
    className,
  }: {
    size?: number;
    color?: string;
    className?: string;
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.293l8 7.2V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1v-9.507l8-7.2z" />
    </svg>
  );

  return (
    <div className="w-screen h-screen flex bg-white font-sans overflow-hidden">
      <aside className="w-80 h-screen overflow-y-auto bg-gray-200 flex flex-col items-center pt-8 pb-4">
        <div className="self-start pl-6">
          <Link href={"/"}>
            <HomeIcon />
          </Link>
        </div>
        <div className="text-2xl font-normal text-black mb-8">mobile model</div>

        <div className="flex gap-4 items-center mb-6">
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              model === "iphone"
                ? "bg-white border-2 border-black font-bold"
                : "bg-transparent border-2 border-transparent"
            }`}
            onClick={() => setModel("iphone")}
          >
            iPhone
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              model === "galaxy"
                ? "bg-white border-2 border-black font-bold"
                : "bg-transparent border-2 border-transparent"
            }`}
            onClick={() => setModel("galaxy")}
          >
            Galaxy
          </button>
        </div>

        <div className="w-2/3 h-px bg-black mb-6" />

        <div className="flex flex-col gap-3 w-full px-6">
          {frames.map((frame, idx) => (
            <button
              key={idx}
              className={`w-full py-3 px-4 rounded-lg border-2 transition-all text-left ${
                selectedFrame === idx
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => setSelectedFrame(idx)}
            >
              <div className="font-medium">{frame.name}</div>
              <div className="text-sm opacity-70">
                {frame.width} × {frame.height}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 h-screen flex items-center justify-center gap-12 px-8">
        <div
          className="flex flex-col items-center justify-center"
          style={{ width: `${previewWidth}px` }}
        >
          {imageSrc ? (
            <>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-gray-300 rounded-lg"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  Drag: Move
                  <br /> Corner: Resize
                </div>
              </div>
              <div className="flex gap-1 w-full">
                <button
                  onClick={handleReset}
                  className="mt-4 w-full bg-white border-2 py-2 border-black font-bold rounded-3xl hover:bg-black hover:text-white transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={handleCrop}
                  className="mt-4 w-full bg-white border-2 py-2 border-black font-bold rounded-3xl hover:bg-black hover:text-white transition-all"
                >
                  Crop
                </button>
              </div>
            </>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              style={{
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
              }}
            >
              <button
                type="button"
                className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M12 7v10M7 12h10"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="mt-4 text-lg">add photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>

        <div
          className="flex flex-col items-center justify-center"
          style={{ width: `${previewWidth}px` }}
        >
          <div
            className="rounded-[40px] border-4 border-black bg-gray-100 transition-all duration-300 shadow-2xl overflow-hidden relative"
            style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
          >
            {resultUrl ? (
              <>
                <img
                  src={resultUrl}
                  alt="크롭된 배경화면"
                  className="w-full h-full object-cover"
                />
                {/* 잠금화면 오버레이 */}
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 text-white">
                  {model === "iphone" ? (
                    <div className="flex flex-col items-center">
                      <div
                        className="text-7xl font-light tracking-tight"
                        style={{ fontFamily: "system-ui, -apple-system" }}
                      >
                        {formatTime().hours}:{formatTime().minutes}
                      </div>
                      <div className="text-lg font-medium mt-2 tracking-wide">
                        {formatDate()}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div
                        className="text-6xl font-normal tracking-normal"
                        style={{ fontFamily: "system-ui" }}
                      >
                        {formatTime().hours}:{formatTime().minutes}
                      </div>
                      <div className="text-base font-normal mt-1 opacity-90">
                        {formatDate()}
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-8 flex flex-col items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mb-2"
                    >
                      <path
                        d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
                        fill="white"
                      />
                    </svg>
                    <div className="text-xs opacity-75">
                      위로 밀어서 잠금 해제
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-center p-8">
                <div>
                  <div className="text-lg font-medium mb-2">
                    {currentFrame.name}
                  </div>
                  <div className="text-sm">Preview</div>
                </div>
              </div>
            )}
          </div>

          {resultUrl && (
            <a
              href={resultUrl}
              download={`${currentFrame.name}_wallpaper.jpg`}
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all text-center font-medium"
            >
              Download
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
