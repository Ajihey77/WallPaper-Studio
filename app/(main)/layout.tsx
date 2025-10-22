export default function MainLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
        {/* 로고/타이틀 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 b  bg-black rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10.5 6H5l3.5-4.5 2.5 3 3.5-4.5L19 17Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">WallPaper Studio</h1>
          </div>
        </div>

      
      </header>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: children (메인 컨텐츠) */}
        <div className="flex-1 overflow-hidden  py-4">
          {children}
        </div>

        {/* 오른쪽: preview (고정 너비) */}
        <div className="w-96 flex-shrink-0 flex justify-center items-start py-4 pr-8">
          {preview}
        </div>
      </div>
    </div>
  );
}