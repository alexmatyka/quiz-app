import type { QuestionBlock } from "@/lib/types/quiz";

type QuestionBlockProps = {
  block: QuestionBlock;
};

export const QuestionBlockRenderer = ({ block }: QuestionBlockProps) => {
  return <div>{block.content.text}</div>;
};
