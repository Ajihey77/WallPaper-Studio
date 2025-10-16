import type { ModelType, DeviceFrame } from "../types";

export default function ProductPreview({
  previewWidth,
  previewHeight,
  resultUrl,
  model,
  timeText,
  dateText,
  currentFrame,
}: {
  previewWidth: number;
  previewHeight: number;
  resultUrl: string | null;
  model: ModelType;
  timeText: string; // e.g., "12:34"
  dateText: string; // e.g., "10월 16일 목요일"
  currentFrame: DeviceFrame;
}) {
  return (
    <>
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
                      {timeText}
                    </div>
                    <div className="text-lg font-medium mt-2 tracking-wide">
                      {dateText}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div
                      className="text-6xl font-normal tracking-normal"
                      style={{ fontFamily: "system-ui" }}
                    >
                      {timeText}
                    </div>
                    <div className="text-base font-normal mt-1 opacity-90">
                      {dateText}
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
    </>
  );
}
