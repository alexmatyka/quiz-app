import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type QuestionOption, QuestionType } from "@/lib/types/quiz";
import { useQuizStore } from "@/stores/quiz.store";

type QuestionOptionsSingleProps = {
  options: QuestionOption[];
  questionId: string;
};

export const QuestionOptionsSingle = ({
  options,
  questionId,
}: QuestionOptionsSingleProps) => {
  const userAnswers = useQuizStore((s) => s.userAnswers[questionId]);
  const setAnswer = useQuizStore((s) => s.setAnswer);

  const selectedValue =
    userAnswers?.type === QuestionType.Single ? userAnswers.value : undefined;

  const onChangeAnswer = (value: string) => {
    setAnswer(questionId, {
      type: QuestionType.Single,
      value,
    });
  };

  return (
    <RadioGroup
      className="flex flex-col gap-2"
      value={selectedValue}
      onValueChange={onChangeAnswer}
    >
      {options.map((option) => {
        const id = `radio-${option.id}`;
        return (
          <div key={option.id} className="flex items-center gap-3">
            <RadioGroupItem
              id={id}
              value={option.id}
              className="h-5 w-5 border-2 border-gray-500 data-[state=checked]:border-blue-600"
            />
            <label htmlFor={id} className="cursor-pointer text-gray-800">
              {option.value}
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
