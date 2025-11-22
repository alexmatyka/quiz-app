import { type KeyboardEvent, memo } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonBlock, QuizBlock } from "@/lib/types/quiz";
import { cn } from "@/lib/utils";

type ButtonBlockRendererProps = {
  block: ButtonBlock;
  onClick: (el: QuizBlock) => void;
  isActive: boolean;
};

export const ButtonBlockRenderer = memo(
  ({ block, onClick, isActive }: ButtonBlockRendererProps) => {
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
        <h3 className="mb-3 font-bold">Button</h3>

        <Button
          onClick={() => onClick(block)}
          variant="outline"
          size="lg"
          className="w-full h-[60px] bg-transparent hover:bg-transparent"
        >
          {block.content.text}
        </Button>
      </div>
    );
  },
);
