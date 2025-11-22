import { type KeyboardEvent, memo } from "react";
import type { HeadingBlock, QuizBlock } from "@/lib/types/quiz";
import { cn } from "@/lib/utils";

type HeaderBlockRendererProps = {
  block: HeadingBlock;
  onClick: (el: QuizBlock) => void;
  isActive: boolean;
};

export const HeaderBlockRenderer = memo(
  ({ block, onClick, isActive }: HeaderBlockRendererProps) => {
    const Header = block.content.variant || "h1";

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
        onClick={() => onClick(block)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={cn(
          "p-5 border-1 border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-[1.02]",
          isActive && "border-blue-600 bg-blue-50 shadow-lg",
        )}
      >
        <h3 className="mb-3 font-bold">Header</h3>
        <Header>{block.content.text}</Header>
      </div>
    );
  },
);
