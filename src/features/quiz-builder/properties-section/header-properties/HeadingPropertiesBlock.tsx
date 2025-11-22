import { type ChangeEvent, useState } from "react";
import { AppSelect, type SelectOption } from "@/components/AppSelect";
import { Input } from "@/components/ui/input";
import { useQuizEditorContext } from "@/features/quiz-builder/context/QuizBuilderContext";
import { PropertiesBlockActions } from "@/features/quiz-builder/properties-section/PropertiesBlockActions";
import { HEADING_OPTIONS } from "@/features/quiz-builder/utils/configs";
import type { HeadingBlock, HeadingBlockVariants } from "@/lib/types/quiz";

type HeadingPropertiesBlockProps = {
  block: HeadingBlock;
};

// NOTE: Current component is small, so we don't optimize renders.
// If it grows, consider moving state down or memoizing subcomponents to avoid unnecessary re-renders.
export const HeadingPropertiesBlock = ({
  block,
}: HeadingPropertiesBlockProps) => {
  const [headingVariant, updateHeadingVariant] = useState<HeadingBlockVariants>(
    block.content.variant,
  );
  const [headingText, updateHeadingText] = useState(block.content.text);
  const { onRemoveBlock, onUpdateBlock } = useQuizEditorContext();

  const onChangeHeadingVariant = (
    option: SelectOption<HeadingBlockVariants>,
  ) => {
    updateHeadingVariant(option.value);
  };

  const onUpdateHeadingTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateHeadingText(e.target.value);
  };

  const isApplyDisabled =
    block.content.text === headingText &&
    block.content.variant === headingVariant;

  const onUpdateBlockAction = () => {
    onUpdateBlock({
      ...block,
      content: { text: headingText, variant: headingVariant },
    });
  };

  const onRemoveBlockAction = () => onRemoveBlock(block.id);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-gray-500">Text</h3>
        <Input value={headingText} onChange={onUpdateHeadingTitle} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl text-gray-500">Size</h3>
        <AppSelect<HeadingBlockVariants>
          options={HEADING_OPTIONS}
          value={headingVariant}
          onChangeAction={onChangeHeadingVariant}
        />
      </div>
      <PropertiesBlockActions
        isApplyDisabled={isApplyDisabled}
        onRemoveBlock={onRemoveBlockAction}
        onUpdateBlock={onUpdateBlockAction}
      />
    </div>
  );
};
