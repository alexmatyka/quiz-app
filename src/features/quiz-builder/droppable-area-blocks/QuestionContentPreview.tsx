import { OpenQuestionOption } from "@/features/quiz-builder/droppable-area-blocks/OpenQuestionOption";
import { QuestionOptionsMulti } from "@/features/quiz-builder/droppable-area-blocks/QuestionOptionsMulti";
import { QuestionOptionsSingle } from "@/features/quiz-builder/droppable-area-blocks/QuestionOptionsSingle";
import { type QuestionOption, QuestionType } from "@/lib/types/quiz";

type QuestionContentPreviewProps = {
  type: QuestionType;
  options: QuestionOption[];
  questionId: string;
};

export const QuestionContentPreview = ({
  type,
  options,
  questionId,
}: QuestionContentPreviewProps) => {
  if (type === QuestionType.Single) {
    return <QuestionOptionsSingle options={options} questionId={questionId} />;
  }

  if (type === QuestionType.Multi) {
    return <QuestionOptionsMulti options={options} questionId={questionId} />;
  }

  return <OpenQuestionOption questionId={questionId} />;
};
