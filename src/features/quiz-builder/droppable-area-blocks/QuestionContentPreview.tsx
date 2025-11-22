import { Textarea } from "@/components/ui/textarea";
import { QuestionOptionsMulti } from "@/features/quiz-builder/droppable-area-blocks/QuestionOptionsMulti";
import { QuestionOptionsSingle } from "@/features/quiz-builder/droppable-area-blocks/QuestionOptionsSingle";
import { type QuestionOption, QuestionType } from "@/lib/types/quiz";

type QuestionContentPreviewProps = {
  type: QuestionType;
  options: QuestionOption[];
};

export const QuestionContentPreview = ({
  type,
  options,
}: QuestionContentPreviewProps) => {
  if (type === QuestionType.Single) {
    return <QuestionOptionsSingle options={options} />;
  }

  if (type === QuestionType.Multi) {
    return <QuestionOptionsMulti options={options} />;
  }

  return (
    <Textarea
      placeholder="Open question"
      disabled={true}
      className="h-[50px] w-full"
    />
  );
};
