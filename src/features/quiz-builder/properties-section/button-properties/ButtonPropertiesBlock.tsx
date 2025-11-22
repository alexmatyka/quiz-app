import { type ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuizEditorContext } from "@/features/quiz-builder/context/QuizBuilderContext";
import { PropertiesBlockActions } from "@/features/quiz-builder/properties-section/PropertiesBlockActions";
import type { ButtonBlock } from "@/lib/types/quiz";

type FooterPropertiesBlockProps = {
  block: ButtonBlock;
};

export const ButtonPropertiesBlock = ({
  block,
}: FooterPropertiesBlockProps) => {
  const [buttonText, updateButtonText] = useState(block.content.text);
  const { onRemoveBlock, onUpdateBlock } = useQuizEditorContext();

  const onUpdateFooterTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateButtonText(e.target.value);
  };

  const isApplyDisabled = block.content.text === buttonText;

  const onUpdateBlockAction = () => {
    onUpdateBlock({ ...block, content: { text: buttonText } });
  };

  const onRemoveBlockAction = () => onRemoveBlock(block.id);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-gray-500">Text</h3>
        <Input value={buttonText} onChange={onUpdateFooterTitle} />
      </div>
      <PropertiesBlockActions
        isApplyDisabled={isApplyDisabled}
        onRemoveBlock={onRemoveBlockAction}
        onUpdateBlock={onUpdateBlockAction}
      />
    </div>
  );
};
