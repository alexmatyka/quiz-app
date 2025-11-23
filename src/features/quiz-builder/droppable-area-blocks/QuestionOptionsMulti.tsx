import { Checkbox } from "@/components/ui/checkbox";
import { type QuestionOption, QuestionType } from "@/lib/types/quiz";
import { useQuizStore } from "@/stores/quiz.store";

type QuestionOptionsMultiProps = {
  options: QuestionOption[];
  questionId: string;
};

export const QuestionOptionsMulti = ({
  options,
  questionId,
}: QuestionOptionsMultiProps) => {
  const userAnswers = useQuizStore((s) => s.userAnswers[questionId]);
  const setAnswer = useQuizStore((s) => s.setAnswer);

  const selectedValues =
    userAnswers?.type === QuestionType.Multi ? userAnswers.value : [];

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setAnswer(questionId, {
      type: QuestionType.Multi,
      value: newValues,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const id = `checkbox-${opt.id}`;
        const checked = selectedValues.includes(opt.id);

        return (
          <div key={opt.id} className="flex items-center gap-3">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={() => toggleOption(opt.id)}
              className="
                h-5 w-5
                border-2 border-gray-500
                data-[state=checked]:bg-blue-600
                data-[state=checked]:border-blue-600
              "
            />
            <label htmlFor={id} className="cursor-pointer text-gray-800">
              {opt.value}
            </label>
          </div>
        );
      })}
    </div>
  );
};
