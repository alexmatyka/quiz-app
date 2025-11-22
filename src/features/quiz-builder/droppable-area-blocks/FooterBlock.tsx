import { type KeyboardEvent, memo } from "react";
import type { FooterBlock, QuizBlock } from "@/lib/types/quiz";
import { cn } from "@/lib/utils";

type FooterBlockRendererProps = {
  block: FooterBlock;
  onClick: (el: QuizBlock) => void;
  isActive: boolean;
};

export const FooterBlockRenderer = memo(
  ({ block, onClick, isActive }: FooterBlockRendererProps) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(block);
      }
    };

    return (
      // biome-ignore lint/a11y/useSemanticElements: use div for custom styling
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(block)}
        onKeyDown={handleKeyDown}
        className={cn(
          "p-5 border-1 border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-[1.02]",
          isActive && "border-blue-600 bg-blue-50 shadow-lg",
        )}
      >
        <h3 className="mb-3 font-bold">Footer</h3>
        <p>{block.content.text}</p>
      </div>
    );
  },
);
