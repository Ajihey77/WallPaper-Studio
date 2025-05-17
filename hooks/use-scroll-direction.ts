import { useRef, useEffect } from "react";

export function UseScrollDirection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);

  const handleWheel = (e: WheelEvent) => {
    if (!containerRef.current || isAnimating.current) return;

    const el = containerRef.current;

    const currentScroll = el.scrollTop;
    const clientHeight = el.clientHeight + 32;

    const pageCount = Math.ceil(el.scrollHeight / clientHeight);
    const currentPage = Math.floor(currentScroll / clientHeight);

    let targetPage = currentPage;

    if (e.deltaY > 0) {
      targetPage = Math.min(currentPage + 1, pageCount - 1);
    } else if (e.deltaY < 0) {
      targetPage = Math.max(currentPage - 1, 0);
    } else {
      return;
    }

    const targetScroll = targetPage * clientHeight;

    if (targetScroll === currentScroll) return; // 이미 해당 위치면 무시

    isAnimating.current = true;

    el.scrollTo({ top: targetScroll, behavior: "smooth" });

    const checkIfScrollEnded = () => {
      const diff = Math.abs(el.scrollTop - targetScroll);
      if (diff < 2) {
        isAnimating.current = false;
        el.removeEventListener("scroll", checkIfScrollEnded);
      }
    };

    el.addEventListener("scroll", checkIfScrollEnded);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return { containerRef };
}
