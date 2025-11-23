import { type KeyboardEvent, memo } from "react";
import { QuestionContentPreview } from "@/features/quiz-builder/droppable-area-blocks/QuestionContentPreview";
import type { QuestionBlock, QuizBlock } from "@/lib/types/quiz";
import { cn } from "@/lib/utils";

type QuestionBlockProps = {
  block: QuestionBlock;
  onClick: (el: QuizBlock) => void;
  isActive: boolean;
};

export const QuestionBlockRenderer = memo(
  ({ block, onClick, isActive }: QuestionBlockProps) => {
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
        onKeyDown={handleKeyDown}
        onClick={() => onClick(block)}
        className={cn(
          "p-5 border-1 border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-[1.02] z-50 bg-white",
          isActive && "border-blue-600 bg-blue-50 shadow-lg",
        )}
      >
        <h3 className="mb-3 font-bold">Question</h3>
        <div className="flex flex-col gap-3">
          <p>{block.content.text}</p>
          <QuestionContentPreview
            questionId={block.id}
            type={block.content.questionType}
            options={block.content.options || []}
          />
        </div>
      </div>
    );
  },
);
