import React from "react";

export default function MainHeader() {
  return (
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
  );
}
