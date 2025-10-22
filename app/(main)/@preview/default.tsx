import PhotoFrame from "../../../ui/main-photo-frame";

export default function ModalDefault() {
  return (
    <PhotoFrame>
      <div className="w-full h-full flex items-center justify-center p-8">
        {/* 메인 카드 */}
        <div className="relative max-w-md w-full">
          {/* 배경 장식 */}
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-2xl" />

          {/* 카드 본체 */}
          <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* 아이콘 */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                  <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10.5 6H5l3.5-4.5 2.5 3 3.5-4.5L19 17Z" />
                </svg>
              </div>
            </div>
            {/* 메시지 */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
              Choose photo
              </h3>
              <p className="text-xs text-gray-500">
              Pick an image to make your own wallpaper.
              </p>
            </div>
           
          </div>
        </div>
      </div>
    </PhotoFrame>
  );
}
