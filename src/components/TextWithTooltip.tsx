import { type ElementType, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type TextWithTooltipProps = {
  text?: string;
  className?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  as?: ElementType;
  tooltipDuration?: number;
};

export function TextWithTooltip({
  text,
  className = "",
  tooltipSide = "top",
  as: Component = "p",
  tooltipDuration = 3000,
}: TextWithTooltipProps) {
  const [open, setOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: depends on text changes
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setIsTruncated(el.scrollWidth > el.clientWidth);
      setTooltipWidth(el.clientWidth);
    });

    observer.observe(el);

    setIsTruncated(el.scrollWidth > el.clientWidth);
    setTooltipWidth(el.clientWidth);

    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), tooltipDuration);
    return () => clearTimeout(timer);
  }, [open, tooltipDuration]);

  return (
    <Tooltip open={open && isTruncated} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <Component
          ref={textRef}
          className={cn(className, isTruncated && "cursor-pointer")}
        >
          {text}
        </Component>
      </TooltipTrigger>
      {isTruncated && (
        <TooltipContent
          className="break-words whitespace-normal bg-ds-secondary text-center"
          style={{
            maxWidth: tooltipWidth,
            width: "max-content",
          }}
          side={tooltipSide}
        >
          {text}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
