import { useRef, useEffect } from "react";

export const useHorizontalScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollContainer = section.querySelector(
      ".scroll-container"
    ) as HTMLDivElement;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      e.preventDefault();
      scrollContainer.scrollTo({
        left: scrollContainer.scrollLeft + e.deltaY * 1.2,
        behavior: "auto",
      });
    };

    section.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return sectionRef;
};
