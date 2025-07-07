import React from "react";

// 1920x1080 기준을 100vw, 100vh로 환산
// px → vw/vh 변환: (px/1920)*100vw, (px/1080)*100vh

export default function Wishlist() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white font-anonymous-pro overflow-hidden">
      <div className="w-screen h-screen flex flex-row">
        {/* 사이드바 */}
        <aside
          className="relative flex flex-col items-start overflow-y-auto bg-[#d9d9d9] scrollbar-thin scrollbar-thumb-gray-200"
          style={{
            width: `${(580 / 1920) * 100}vw`,
            height: "100vh",
            paddingLeft: `${(66 / 1920) * 100}vw`,
            paddingTop: `${(78 / 1080) * 100}vh`,
            boxSizing: "border-box",
          }}
        >
          <div className="font-normal text-black mb-[5.5vh]" style={{ fontSize: "2.2vw" }}>
            mobile model
          </div>
          <div className="flex gap-[2vw] items-center mb-[2.7vh]">
            <span className="text-black" style={{ fontSize: "1.25vw" }}>iphone</span>
            <span className="text-black" style={{ fontSize: "1.25vw" }}>galaxy</span>
          </div>
          <div className="bg-black mb-[3.7vh]" style={{ width: `${(206 / 580) * 100}%`, height: 1 }} />
          {/* 모델별 프레임들 */}
          <div className="flex flex-wrap gap-[1.5vw]">
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "7vw", height: "23vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "7vw", height: "24vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "6vw", height: "22vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "7vw", height: "25vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "6vw", height: "22vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "6vw", height: "21vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "7vw", height: "19vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "6vw", height: "17vh", fontSize: "0.9vw" }} />
            <div className="bg-white border border-black flex items-center justify-center" style={{ width: "5vw", height: "15vh", fontSize: "0.9vw" }} />
          </div>
        </aside>
        {/* 미리보기 영역 */}
        <main className="flex-1 h-screen flex items-center justify-center relative">
          <div className="relative h-[87vh] w-auto max-w-[300px] aspect-[374/800] ml-4 flex items-center justify-center">
            <div className="w-full h-full rounded-[45px] border border-black bg-cover bg-center absolute inset-0 z-0" />
            <span className="z-10 text-[#aaa] text-center" style={{ fontSize: "1.2vw" }}>미리보기 영역</span>
          </div>
        </main>
      </div>
    </div>
  );
}
