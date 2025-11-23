import { QuestionBlockItem } from "@/features/quiz-renderer/blocks/QuestionBlockItem";
import type { QuestionBlock } from "@/lib/types/quiz";

type QuestionsBlockComponentProps = {
  questionsBlocks: QuestionBlock[];
};

export const QuestionsBlockComponent = ({
  questionsBlocks,
}: QuestionsBlockComponentProps) => {
  return (
    <div className="py-4 px-1 flex flex-col gap-12">
      {questionsBlocks.map((question, questionIndex) => {
        return (
          <QuestionBlockItem
            key={question.id}
            question={question}
            questionNumber={questionIndex + 1}
          />
        );
      })}
    </div>
  );
};
