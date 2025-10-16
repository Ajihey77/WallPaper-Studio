"use client";
import Link from "next/link";
import React from "react";
import { galaxyFrames, iphoneFrames } from "../data/deviceFrames";
import type { ModelType, DeviceFrame } from "../types";

export default function ModelAside({
  model,
  selectedFrame,
  setModel,
  setSelectedFrame,
}: {
  model: ModelType;
  selectedFrame: number;
  setModel: React.Dispatch<React.SetStateAction<ModelType>>;
  setSelectedFrame: React.Dispatch<React.SetStateAction<number>>;
}) {
  const frames: DeviceFrame[] = model === "iphone" ? iphoneFrames : galaxyFrames;
  return (
    <>
      <aside className="w-80 h-screen overflow-y-auto bg-gray-200 flex flex-col items-center pt-8 pb-4">
        <div className="self-start pl-6">
          <Link href={"/"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 3.293l8 7.2V20a1 1 0 0 1-1 1h-5v-5H10v5H5a1 1 0 0 1-1-1v-9.507l8-7.2z" />
            </svg>
          </Link>
        </div>
        <div className="text-2xl font-normal text-black mb-8">mobile model</div>

        <div className="flex gap-4 items-center mb-6">
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              model === "iphone"
                ? "bg-white border-2 border-black font-bold"
                : "bg-transparent border-2 border-transparent"
            }`}
            onClick={() => setModel("iphone")}
          >
            iPhone
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              model === "galaxy"
                ? "bg-white border-2 border-black font-bold"
                : "bg-transparent border-2 border-transparent"
            }`}
            onClick={() => setModel("galaxy")}
          >
            Galaxy
          </button>
        </div>

        <div className="w-2/3 h-px bg-black mb-6" />

        <div className="flex flex-col gap-3 w-full px-6">
          {frames.map((frame, idx) => (
            <button
              key={`${frame.name}-${frame.width}x${frame.height}`}
              className={`w-full py-3 px-4 rounded-lg border-2 transition-all text-left ${
                selectedFrame === idx
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => setSelectedFrame(idx)}
            >
              <div className="font-medium">{frame.name}</div>
              <div className="text-sm opacity-70">
                {frame.width} × {frame.height}
              </div>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
