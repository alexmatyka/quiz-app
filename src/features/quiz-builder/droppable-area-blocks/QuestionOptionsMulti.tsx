import { Checkbox } from "@/components/ui/checkbox";
import type { QuestionOption } from "@/lib/types/quiz";

type QuestionOptionsMultiProps = {
  options: QuestionOption[];
};

export const QuestionOptionsMulti = ({
  options,
}: QuestionOptionsMultiProps) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const id = `checkbox-${opt.id}`;

        return (
          <div key={opt.id} className="flex items-center gap-3">
            <Checkbox
              id={id}
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
