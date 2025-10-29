"use client";

import { ErrorBoundary } from "react-error-boundary";
import MainHeader from "../../ui/main-header";
import { ErrorFallback } from "../../components/error/ErrorBoundary";
import { Suspense } from "react";
import SkeletonGrid from "../../ui/skeletongrid";

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
      <MainHeader />
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽: children (메인 컨텐츠) */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // 갤러리만 리셋
            window.location.reload();
          }}
        >
          <Suspense fallback={<SkeletonGrid />}></Suspense>
          <div className="flex-1 overflow-hidden  py-4">{children}</div>
        </ErrorBoundary>

        {/* 오른쪽: preview (고정 너비) */}
        <div className="w-96 flex-shrink-0 flex justify-center items-start py-4 pr-8">
          {preview}
        </div>
      </div>
    </div>
  );
}
