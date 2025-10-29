// components/ErrorTest.tsx
"use client";

import { useState } from "react";
import { ErrorFallback } from "./ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

export function ErrorTest() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("테스트 에러 발생!");
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      에러 발생시키기
    </button>
  );
}

// 사용
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <ErrorTest />
</ErrorBoundary>;
