import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuestionOption } from "@/lib/types/quiz";

type QuestionOptionsSingleProps = {
  options: QuestionOption[];
};

export const QuestionOptionsSingle = ({
  options,
}: QuestionOptionsSingleProps) => {
  return (
    <RadioGroup className="flex flex-col gap-2">
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
