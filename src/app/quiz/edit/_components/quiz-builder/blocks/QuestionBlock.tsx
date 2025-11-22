import type { QuestionBlock } from "@/lib/types/quiz";

type QuestionBlockProps = {
  block: QuestionBlock;
};

export const QuestionBlockRenderer = ({ block }: QuestionBlockProps) => {
  return (
    <div className="p-5 border-1 border-gray-300">{block.content.text}</div>
  );
};
