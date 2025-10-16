"use client";

import React from "react";
import { useImageCrop, type FrameSize } from "../hooks/use-image-crop";

type AddPhotoProps = {
  frame: FrameSize;
  displayScale: number;
  onCropped?: (url: string) => void;
};

export default function AddPhoto({ frame, displayScale, onCropped }: AddPhotoProps) {
  const {
    previewWidth,
    previewHeight,
    fileInputRef,
    canvasRef,
    imageRef,
    imageSrc,
    resultUrl,
    handleFileChange,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
    handleCrop,
  } = useImageCrop(frame, displayScale);

  React.useEffect(() => {
    if (resultUrl && onCropped) onCropped(resultUrl);
  }, [resultUrl, onCropped]);

  return (
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
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.5" />
              <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
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
  );
}