import { Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { QuestionOption } from "@/lib/types/quiz";

type QuestionOptionItemProps = {
  option: QuestionOption;
  onRemove: () => void;
  onSave: (updated: QuestionOption) => void;
  autoFocus: boolean;
};

export const QuestionOptionItem = ({
  option,
  onRemove,
  onSave,
  autoFocus,
}: QuestionOptionItemProps) => {
  const [text, setText] = useState(option.value);

  const handleSave = () => onSave({ ...option, value: text });

  const isDirty = text !== option.value;

  return (
    <div className="flex items-center gap-2">
      <Input
        autoFocus={autoFocus}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Option text"
        className="flex-1"
      />

      {isDirty && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleSave}
          aria-label="Save option"
        >
          <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
        </Button>
      )}

      <Button
        size="sm"
        variant="ghost"
        onClick={onRemove}
        aria-label="Remove option"
      >
        <X className="w-4 h-4 text-red-500" aria-hidden="true" />
      </Button>
    </div>
  );
};
