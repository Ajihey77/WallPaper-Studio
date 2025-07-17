"use client";

import React, { useRef, useState } from "react";
import ReactCropper, { ReactCropperElement } from "react-cropper";
import CropperJs from "cropperjs";

// 1920x1080 기준을 100vw, 100vh로 환산
// px → vw/vh 변환: (px/1920)*100vw, (px/1080)*100vh

export default function Wishlist() {
  // 모델별 프레임 데이터
  const iphoneFrames = [
    { name: "iPhone 15 Pro Max", width: "7vw", height: "23vh" },
    { name: "iPhone 15 Pro", width: "7vw", height: "24vh" },
    { name: "iPhone 15", width: "6vw", height: "22vh" },
    { name: "iPhone 14 Pro Max", width: "7vw", height: "25vh" },
    { name: "iPhone 14 Pro", width: "6vw", height: "22vh" },
    { name: "iPhone 14", width: "6vw", height: "21vh" },
    { name: "iPhone 13 Pro Max", width: "7vw", height: "19vh" },
    { name: "iPhone 13 Pro", width: "6vw", height: "17vh" },
    { name: "iPhone 13", width: "5vw", height: "15vh" },
    { name: "iPhone 12 Pro Max", width: "7vw", height: "23vh" },
    { name: "iPhone 12 Pro", width: "6vw", height: "21vh" },
    { name: "iPhone 12", width: "5vw", height: "15vh" },
    { name: "iPhone 11 Pro Max", width: "7vw", height: "23vh" },
    { name: "iPhone 11 Pro", width: "6vw", height: "21vh" },
    { name: "iPhone 11", width: "5vw", height: "15vh" },
    { name: "iPhone XS Max", width: "7vw", height: "23vh" },
    { name: "iPhone XS", width: "6vw", height: "21vh" },
    { name: "iPhone XR", width: "5vw", height: "15vh" },
    { name: "iPhone X", width: "6vw", height: "21vh" },
    { name: "iPhone 8 Plus", width: "7vw", height: "23vh" },
    { name: "iPhone 8", width: "5vw", height: "15vh" },
    { name: "iPhone 7 Plus", width: "7vw", height: "23vh" },
    { name: "iPhone 7", width: "5vw", height: "15vh" },
    { name: "iPhone 6s Plus", width: "7vw", height: "23vh" },
    { name: "iPhone 6s", width: "5vw", height: "15vh" },
    { name: "iPhone 6 Plus", width: "7vw", height: "23vh" },
    { name: "iPhone 6", width: "5vw", height: "15vh" },
  ];
  const galaxyFrames = [
    { name: "S24 Ultra", width: "7vw", height: "24vh" },
    { name: "S24+", width: "7vw", height: "24vh" },
    { name: "S24", width: "6vw", height: "22vh" },
    { name: "S23 Ultra", width: "7vw", height: "24vh" },
    { name: "S23+", width: "7vw", height: "24vh" },
    { name: "S23", width: "6vw", height: "22vh" },
    { name: "S22 Ultra", width: "7vw", height: "24vh" },
    { name: "S22+", width: "7vw", height: "24vh" },
    { name: "S22", width: "6vw", height: "22vh" },
    { name: "S21 Ultra", width: "7vw", height: "24vh" },
    { name: "S21+", width: "7vw", height: "24vh" },
    { name: "S21", width: "6vw", height: "22vh" },
    { name: "S20 Ultra", width: "7vw", height: "24vh" },
    { name: "S20+", width: "7vw", height: "24vh" },
    { name: "S20", width: "6vw", height: "22vh" },
    { name: "S10 5G", width: "7vw", height: "24vh" },
    { name: "S10+", width: "7vw", height: "24vh" },
    { name: "S10", width: "6vw", height: "22vh" },
    { name: "S10e", width: "5vw", height: "20vh" },
    { name: "S9+", width: "7vw", height: "24vh" },
    { name: "S9", width: "6vw", height: "22vh" },
    { name: "S8+", width: "7vw", height: "24vh" },
    { name: "S8", width: "6vw", height: "22vh" },
    { name: "S7 Edge", width: "7vw", height: "24vh" },
    { name: "S7", width: "6vw", height: "22vh" },
    { name: "S6 Edge+", width: "7vw", height: "24vh" },
    { name: "S6 Edge", width: "6vw", height: "22vh" },
    { name: "S6", width: "5vw", height: "20vh" },
  ];
  // 모델 상태: 'iphone' 또는 'galaxy'
  const [model, setModel] = useState<"iphone" | "galaxy">("iphone");
  // 선택된 프레임 인덱스 상태
  const [selectedFrame, setSelectedFrame] = useState(0);
  // 모델이 바뀌면 프레임 인덱스 초기화
  React.useEffect(() => {
    setSelectedFrame(0);
  }, [model]);
  // 현재 프레임 배열
  const frames = model === "iphone" ? iphoneFrames : galaxyFrames;
  // 미리보기 기준 크기
  // const baseWidth = 300; // px
  // const baseHeight = 600; // px
  // // 최대값(비율 기준)
  // const maxFrameWidth = Math.max(...frames.map(f => Number(f.width.replace('vw',''))));
  // const maxFrameHeight = Math.max(...frames.map(f => Number(f.height.replace('vh',''))));
  // // 미리보기용 실제 px 크기 계산
  // const previewWidth = (Number(frames[selectedFrame].width.replace('vw','')) / maxFrameWidth) * baseWidth;
  // const previewHeight = (Number(frames[selectedFrame].height.replace('vh','')) / maxFrameHeight) * baseHeight;

  // const fileInputRef = React.useRef<HTMLInputElement>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     console.log("Selected file:", file.name);
  //     // 파일 처리 로직 추가
  //   }
  // };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const previewWidth = 300;
  const previewHeight = (300 * 800) / 374; // 비율 유지

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

  const handleCropAndUpload = async () => {
    if (!cropperRef.current) return;
    const cropper: CropperJs | undefined = cropperRef.current?.cropper;

    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas();
    // const cropper = cropperRef.current.getCroppedCanvas();

    if (!cropper) return alert("크롭할 영역이 없습니다.");

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "cropped.jpg");

      try {
        const res = await fetch("/api/resize", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("서버 오류");

        const imageBlob = await res.blob();
        const url = URL.createObjectURL(imageBlob);
        setResultUrl(url);
      } catch (err) {
        alert("이미지 처리에 실패했습니다.");
      }
    }, "image/jpeg");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white font-anonymous-pro overflow-hidden">
      <div className="w-screen h-screen flex flex-row">
        {/* 사이드바 */}
        <aside
          className="relative flex flex-col items-center overflow-y-auto bg-[#d9d9d9] scrollbar-thin
          scrollbar-thumb-gray-200 thinner-scrollbar"
          style={{
            width: `${(580 / 1920) * 100}vw`,
            height: "100vh",
            paddingTop: `${(78 / 1080) * 100}vh`,
            boxSizing: "border-box",
          }}
        >
          <div
            className="font-normal text-black mb-[5.5vh]"
            style={{ fontSize: "2.2vw" }}
          >
            mobile model
          </div>
          <div className="flex gap-[2vw] items-center mb-[2.7vh] justify-center w-full">
            <button
              className={`text-black px-4 py-1 rounded-full transition-all duration-200 ${
                model === "iphone"
                  ? "bg-white border border-black font-bold"
                  : "bg-transparent border border-transparent"
              }`}
              style={{ fontSize: "1.25vw" }}
              onClick={() => setModel("iphone")}
            >
              iphone
            </button>
            <button
              className={`text-black px-4 py-1 rounded-full transition-all duration-200 ${
                model === "galaxy"
                  ? "bg-white border border-black font-bold"
                  : "bg-transparent border border-transparent"
              }`}
              style={{ fontSize: "1.25vw" }}
              onClick={() => setModel("galaxy")}
            >
              galaxy
            </button>
          </div>
          <div
            className="bg-black mb-[3.7vh]"
            style={{ width: `${(206 / 580) * 100}%`, height: 1 }}
          />
          {/* 모델별 프레임들 */}
          <div className="flex flex-wrap gap-[1.5vw] justify-center w-full">
            {frames.map((frame, idx) => (
              <div
                key={idx}
                className={`bg-white border border-black flex flex-col items-center justify-center cursor-pointer ${
                  selectedFrame === idx ? "ring-2 ring-blue-400" : ""
                }`}
                style={{
                  width: frame.width,
                  height: frame.height,
                  fontSize: "0.9vw",
                }}
                onClick={() => setSelectedFrame(idx)}
              >
                {"name" in frame && (
                  <span className="text-xs text-gray-500 mb-1">
                    {(frame as any).name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </aside>
        {/* 미리보기 영역 */}
        <main className="flex-1 h-screen flex flex-col items-center justify-center relative">
          <div
            className="relative w-auto max-w-[300px] aspect-[374/800] ml-4 flex items-center justify-center"
            style={{ height: "87vh" }}
          >
            <div
              className="rounded-[45px] border border-black bg-cover bg-center absolute inset-0 z-0 transition-all duration-300"
              style={{
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
                backgroundImage: resultUrl
                  ? `url(${resultUrl})`
                  : imageSrc
                  ? `url(${imageSrc})`
                  : "none",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
            <button
              type="button"
              className="z-10 flex flex-col items-center justify-center text-[#aaa] text-center hover:text-blue-500 focus:outline-none"
              style={{
                fontSize: "2.5vw",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke="#000"
                  strokeWidth="0.2"
                  fill="none"
                />
                <path
                  d="M12 7v10M7 12h10"
                  stroke="#000"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontSize: "0.9vw", marginTop: 4 }}>사진 첨부</span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </button>
          </div>
          {imageSrc && (
            <div
              className="relative border border-blue-500"
              style={{
                width: frames[selectedFrame].width,
                height: frames[selectedFrame].height,
              }}
            >
              <ReactCropper
                src={imageSrc}
                ref={cropperRef}
                style={{ width: "100%", height: "100%" }}
                viewMode={1}
                guides={false}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
              />

              {/* 프레임 테두리 - 임시로 노란색 */}
              <div className="absolute inset-0 pointer-events-none border-4 border-amber-700 rounded-[45px] z-10" />
            </div>
          )}

          {resultUrl && (
            <a
              href={resultUrl}
              download="wallpaper.jpg"
              className="mt-6 text-blue-600 hover:underline"
            >
              👉 배경화면 다운로드
            </a>
          )}
        </main>
        {/* <main className="flex-1 h-screen flex items-center justify-center relative">
          <div
            className="relative w-auto max-w-[300px] aspect-[374/800] ml-4 flex items-center justify-center"
            style={{ height: "87vh" }}
          >
            <div
              className="rounded-[45px] border border-black bg-cover bg-center absolute inset-0 z-0 transition-all duration-300"
              style={{
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
                margin: "auto",
              }}
            />
            <button
              type="button"
              className="z-10 flex flex-col items-center justify-center text-[#aaa] text-center hover:text-blue-500 focus:outline-none"
              style={{ fontSize: "2.5vw", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
            >
              <svg width="2em" height="2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="#000" strokeWidth="0.2" fill="none"/>
                <path d="M12 7v10M7 12h10" stroke="#000" strokeWidth="0.3" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: "0.9vw", marginTop: 4 }}>사진 첨부</span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </button>
          </div>
        </main> */}
      </div>
    </div>
  );
}
