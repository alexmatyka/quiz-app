import { QuestionContentPreview } from "@/features/quiz-builder/droppable-area-blocks/QuestionContentPreview";
import type { QuestionBlock } from "@/lib/types/quiz";

type QuestionBlockItemProps = {
  question: QuestionBlock;
  questionNumber: number;
};

export const QuestionBlockItem = ({
  question,
  questionNumber,
}: QuestionBlockItemProps) => {
  return (
    <div>
      <p className="font-bold mb-4">
        {questionNumber}. {question.content.text}
      </p>
      <QuestionContentPreview
        type={question.content.questionType}
        options={question.content.options || []}
      />
    </div>
  );
};
