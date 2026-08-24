import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(
  ({ text = "Zoom", className, children, ...props }, ref) => {
    const label = text || children;
    return (
      <button
        ref={ref}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-full border border-black bg-white px-5 py-2.5 text-center font-bold text-xs text-black shadow-md transition-all duration-300 hover:border-black hover:shadow-2xl",
          className,
        )}
        {...props}
      >
        <span className="inline-flex items-center gap-1.5 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          <Sparkles className="h-3.5 w-3.5 text-black" />
          {label}
        </span>
        <div className="absolute inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span>{label}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
        <div className="absolute left-[15%] top-[40%] h-2.5 w-2.5 scale-100 rounded-full bg-black transition-all duration-300 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[3] group-hover:rounded-full"></div>
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
