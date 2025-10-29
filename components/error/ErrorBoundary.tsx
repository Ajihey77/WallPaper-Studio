"use client";
import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-1.5">
        문제가 발생했습니다
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center max-w-sm px-4">
        {error.message || "알 수 없는 오류가 발생했습니다"}
      </p>

      <div className="flex gap-2">
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          다시 시도
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
