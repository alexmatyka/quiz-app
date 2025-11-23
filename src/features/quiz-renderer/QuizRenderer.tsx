import { ButtonBlockComponent } from "@/features/quiz-renderer/blocks/ButtonBlock";
import { FooterBlockComponent } from "@/features/quiz-renderer/blocks/FooterBlock";
import { HeaderBlock } from "@/features/quiz-renderer/blocks/HeaderBlock";
import { QuestionsBlockComponent } from "@/features/quiz-renderer/blocks/QuestionsBlock";
import { getQuizBlocks } from "@/lib/utils/generalQuizUtils";
import { useQuizStore } from "@/stores/quiz.store";

// We can detect this value with mutation observer + ref in more complex cases when we have dynamic header height
const QUIZ_HEADER_HEIGHT = 240;

export const QuizRenderer = () => {
  const quizBlocks = useQuizStore((s) => s.originalQuiz?.blocks) || [];

  const { header, footer, button, questions } = getQuizBlocks(quizBlocks);

  return (
    <div
      className="flex flex-col gap-10 pb-10"
      style={{ height: `calc(100vh - ${QUIZ_HEADER_HEIGHT}px` }}
    >
      {header && <HeaderBlock block={header} />}

      <div className="flex-1">
        {questions.length ? (
          <QuestionsBlockComponent questionsBlocks={questions} />
        ) : (
          <div className="p-6 text-gray-600 text-center">
            No questions provided
          </div>
        )}
      </div>

      {button && <ButtonBlockComponent block={button} />}
      {footer && <FooterBlockComponent block={footer} />}
    </div>
  );
};
