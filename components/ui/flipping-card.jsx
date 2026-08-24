import React from "react";
import { cn } from "@/lib/utils";

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 320,
  width = "100%",
  isFlipped,
  onFlipToggle,
}) {
  const heightStyle = typeof height === "number" ? `${height}px` : height;
  const widthStyle = typeof width === "number" ? `${width}px` : width;

  return (
    <div
      onClick={onFlipToggle}
      className={cn(
        "group/flipping-card [perspective:1000px] w-full cursor-pointer select-none",
        isFlipped && "is-flipped"
      )}
      style={{
        "--height": heightStyle,
        "--width": widthStyle,
      }}
    >
      <div
        className={cn(
          "relative rounded-[28px] border border-neutral-200/90 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)] hover:shadow-xl hover:border-neutral-300",
          isFlipped && "[transform:rotateY(180deg)]",
          "min-h-[var(--height)] h-full w-full",
          className
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
          <div className="[transform:translateZ(40px)] h-full w-full flex flex-col justify-between">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-neutral-950 text-white [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] border border-neutral-800 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
          <div className="[transform:translateZ(40px)] h-full w-full flex flex-col justify-between">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
