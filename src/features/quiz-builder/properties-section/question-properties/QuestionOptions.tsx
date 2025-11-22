"use client";

import { Button } from "@/components/ui/button";
import { QuestionOptionItem } from "@/features/quiz-builder/properties-section/question-properties/QuestionOptionItem";
import type { QuestionOption } from "@/lib/types/quiz";

type QuestionOptionsProps = {
  options: QuestionOption[];
  onChangeOptionsAction: (options: QuestionOption[]) => void;
  ariaLabelledBy: string;
};

export const QuestionOptions = ({
  options,
  onChangeOptionsAction,
  ariaLabelledBy,
}: QuestionOptionsProps) => {
  const addOption = () => {
    const newOption: QuestionOption = { id: crypto.randomUUID(), value: "" };
    onChangeOptionsAction([...options, newOption]);
  };

  const removeOption = (id: string) => {
    onChangeOptionsAction(options.filter((o) => o.id !== id));
  };

  const updateOption = (updated: QuestionOption) => {
    onChangeOptionsAction(
      options.map((o) => (o.id === updated.id ? updated : o)),
    );
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: using <div> intentionally for styling/layout reasons
    <div
      role="group"
      className="flex flex-col gap-2"
      aria-labelledby={ariaLabelledBy}
    >
      {options.map((option, optionIndex) => (
        <QuestionOptionItem
          key={option.id}
          option={option}
          onRemove={() => removeOption(option.id)}
          onSave={updateOption}
          autoFocus={optionIndex === options.length - 1}
        />
      ))}

      {!options.length && (
        <p className="mb-3 text-gray-500 text-sm">No options yet</p>
      )}

      <Button onClick={addOption} className="mt-2">
        Add new option
      </Button>
    </div>
  );
};
