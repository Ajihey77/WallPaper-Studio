"use client";

import { useEffect, useRef, useState } from "react";

export type FrameSize = { width: number; height: number; name?: string };

export function useImageCrop(currentFrame: FrameSize, displayScale: number) {
  const aspectRatio = currentFrame.width / currentFrame.height;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>("");
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, previewWidth, previewHeight, aspectRatio]);

  const getHandleAtPosition = (x: number, y: number) => {
    const handleSize = 12;
    const threshold = handleSize;

    const corners = [
      { x: cropArea.x, y: cropArea.y, handle: "nw" },
      { x: cropArea.x + cropArea.width, y: cropArea.y, handle: "ne" },
      { x: cropArea.x, y: cropArea.y + cropArea.height, handle: "sw" },
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height, handle: "se" },
    ];

    for (const corner of corners) {
      if (Math.abs(x - corner.x) < threshold && Math.abs(y - corner.y) < threshold) {
        return corner.handle as string | null;
      }
    }

    const edges = [
      { x: cropArea.x + cropArea.width / 2, y: cropArea.y, handle: "n" },
      { x: cropArea.x + cropArea.width / 2, y: cropArea.y + cropArea.height, handle: "s" },
      { x: cropArea.x, y: cropArea.y + cropArea.height / 2, handle: "w" },
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height / 2, handle: "e" },
    ];

    for (const edge of edges) {
      if (Math.abs(x - edge.x) < threshold && Math.abs(y - edge.y) < threshold) {
        return edge.handle as string | null;
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
      const newX = Math.max(0, Math.min(x - dragStart.x, canvas.width - cropArea.width));
      const newY = Math.max(0, Math.min(y - dragStart.y, canvas.height - cropArea.height));
      const newCrop = { ...cropArea, x: newX, y: newY };
      setCropArea(newCrop);
      drawCanvas(imageRef.current, newCrop);
    } else if (isResizing) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      let newCrop = { ...cropArea };
      switch (resizeHandle) {
        case "se": {
          const newWidth1 = Math.max(50, cropArea.width + dx);
          const newHeight1 = newWidth1 / aspectRatio;
          if (cropArea.x + newWidth1 <= canvas.width && cropArea.y + newHeight1 <= canvas.height) {
            newCrop.width = newWidth1;
            newCrop.height = newHeight1;
          }
          break;
        }
        case "sw": {
          const newWidth2 = Math.max(50, cropArea.width - dx);
          const newHeight2 = newWidth2 / aspectRatio;
          if (cropArea.x + dx >= 0 && cropArea.y + newHeight2 <= canvas.height) {
            newCrop.x = cropArea.x + dx;
            newCrop.width = newWidth2;
            newCrop.height = newHeight2;
          }
          break;
        }
        case "ne": {
          const newWidth3 = Math.max(50, cropArea.width + dx);
          const newHeight3 = newWidth3 / aspectRatio;
          if (cropArea.x + newWidth3 <= canvas.width && cropArea.y - (newHeight3 - cropArea.height) >= 0) {
            newCrop.y = cropArea.y + cropArea.height - newHeight3;
            newCrop.width = newWidth3;
            newCrop.height = newHeight3;
          }
          break;
        }
        case "nw": {
          const newWidth4 = Math.max(50, cropArea.width - dx);
          const newHeight4 = newWidth4 / aspectRatio;
          if (cropArea.x + dx >= 0 && cropArea.y - (newHeight4 - cropArea.height) >= 0) {
            newCrop.x = cropArea.x + dx;
            newCrop.y = cropArea.y + cropArea.height - newHeight4;
            newCrop.width = newWidth4;
            newCrop.height = newHeight4;
          }
          break;
        }
        case "e":
        case "w": {
          const widthChange = resizeHandle === "e" ? dx : -dx;
          const newWidth = Math.max(50, cropArea.width + widthChange);
          const newHeight = newWidth / aspectRatio;
          const heightDiff = (newHeight - cropArea.height) / 2;
          if (
            (resizeHandle === "e" ? cropArea.x + newWidth <= canvas.width : cropArea.x + (cropArea.width - newWidth) >= 0) &&
            cropArea.y - heightDiff >= 0 &&
            cropArea.y + cropArea.height + heightDiff <= canvas.height
          ) {
            newCrop.x = resizeHandle === "e" ? cropArea.x : cropArea.x + (cropArea.width - newWidth);
            newCrop.y = cropArea.y - heightDiff;
            newCrop.width = newWidth;
            newCrop.height = newHeight;
          }
          break;
        }
        case "n":
        case "s": {
          const heightChange = resizeHandle === "s" ? dy : -dy;
          const newHeight5 = Math.max(50 / aspectRatio, cropArea.height + heightChange);
          const newWidth5 = newHeight5 * aspectRatio;
          const widthDiff = (newWidth5 - cropArea.width) / 2;
          if (
            (resizeHandle === "s" ? cropArea.y + newHeight5 <= canvas.height : cropArea.y + (cropArea.height - newHeight5) >= 0) &&
            cropArea.x - widthDiff >= 0 &&
            cropArea.x + cropArea.width + widthDiff <= canvas.width
          ) {
            newCrop.x = cropArea.x - widthDiff;
            newCrop.y = resizeHandle === "s" ? cropArea.y : cropArea.y + (cropArea.height - newHeight5);
            newCrop.width = newWidth5;
            newCrop.height = newHeight5;
          }
          break;
        }
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

  const handleReset = () => {
    if (!canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const newCrop = initializeCropArea(canvas);
    setCropArea(newCrop);
    drawCanvas(imageRef.current, newCrop);
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

  return {
    // sizes
    previewWidth,
    previewHeight,
    // refs
    fileInputRef,
    canvasRef,
    imageRef,
    // state
    imageSrc,
    setImageSrc,
    resultUrl,
    setResultUrl,
    // handlers
    handleFileChange,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
    handleCrop,
  };
}


