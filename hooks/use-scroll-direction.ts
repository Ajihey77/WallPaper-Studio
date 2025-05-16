import { useCallback, useEffect, useRef } from "react";
import { onScrollProps } from "../types";
import debounce from "lodash.debounce";

export default function UseScrollDirection({
  onScrollDown,
  onScrollUp,
}: onScrollProps) {
  const currentY = useRef<HTMLDivElement>(null);
  const prevY = useRef<number>(0);
  const handleScroll = useCallback(() => {
    if (!currentY.current) return;

    if (currentY.current?.scrollTop > prevY.current) {
      console.log("DOWN");
      onScrollDown?.();
    }

    if (currentY.current?.scrollTop < prevY.current) {
      console.log("UP");
      onScrollUp?.();
    }

    prevY.current = currentY.current.scrollTop;
  }, [onScrollUp, onScrollDown]);

  useEffect(() => {
    if (!currentY.current) return;

    const debouncedScroll = debou(handleScroll, delay);

    currentY.current?.addEventListener("scroll", handleScroll);

    return () => {
      currentY.current?.addEventListener("scroll", handleScroll);
    };
  }, []);

  return { currentY };
}
