import { type ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuizEditorContext } from "@/features/quiz-builder/context/QuizBuilderContext";
import { PropertiesBlockActions } from "@/features/quiz-builder/properties-section/PropertiesBlockActions";
import type { FooterBlock } from "@/lib/types/quiz";

type FooterPropertiesBlockProps = {
  block: FooterBlock;
};

export const FooterPropertiesBlock = ({
  block,
}: FooterPropertiesBlockProps) => {
  const [footerText, updateFooterText] = useState(block.content.text);
  const { onRemoveBlock, onUpdateBlock } = useQuizEditorContext();

  const onUpdateFooterTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateFooterText(e.target.value);
  };

  const isApplyDisabled = block.content.text === footerText;

  const onUpdateBlockAction = () => {
    onUpdateBlock({ ...block, content: { text: footerText } });
  };

  const onRemoveBlockAction = () => onRemoveBlock(block.id);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-gray-500">Text</h3>
        <Input value={footerText} onChange={onUpdateFooterTitle} />
      </div>
      <PropertiesBlockActions
        isApplyDisabled={isApplyDisabled}
        onRemoveBlock={onRemoveBlockAction}
        onUpdateBlock={onUpdateBlockAction}
      />
    </div>
  );
};
