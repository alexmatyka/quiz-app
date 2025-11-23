import type { ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { QuestionType } from "@/lib/types/quiz";
import { useQuizStore } from "@/stores/quiz.store";

type OpenQuestionOptionProps = {
  questionId: string;
};

export const OpenQuestionOption = ({ questionId }: OpenQuestionOptionProps) => {
  const answer = useQuizStore((s) => s.userAnswers[questionId]);
  const setAnswer = useQuizStore((s) => s.setAnswer);

  const onChane = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(questionId, {
      type: QuestionType.Text,
      value: target.value,
    });
  };
  return (
    <Textarea
      placeholder="Enter your answer"
      className="w-full min-h-[80px]"
      value={answer?.type === QuestionType.Text ? answer.value : ""}
      onChange={onChane}
    />
  );
};
