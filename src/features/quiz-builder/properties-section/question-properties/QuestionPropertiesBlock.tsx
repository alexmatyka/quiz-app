import { type ChangeEvent, useEffect, useState } from "react";
import { AppSelect, type SelectOption } from "@/components/AppSelect";
import { Input } from "@/components/ui/input";
import { useQuizEditorContext } from "@/features/quiz-builder/context/QuizBuilderContext";
import { PropertiesBlockActions } from "@/features/quiz-builder/properties-section/PropertiesBlockActions";
import { QuestionOptions } from "@/features/quiz-builder/properties-section/question-properties/QuestionOptions";
import { QUESTION_OPTIONS } from "@/features/quiz-builder/utils/configs";
import { type QuestionBlock, QuestionType } from "@/lib/types/quiz";

type QuestionPropertiesBlockProps = {
  block: QuestionBlock;
};

// NOTE: Current component is small, so we don't optimize renders.
// If it grows, consider moving state down or memoizing subcomponents to avoid unnecessary re-renders.
export const QuestionPropertiesBlock = ({
  block,
}: QuestionPropertiesBlockProps) => {
  const [questionText, updateQuestionText] = useState(block.content.text);

  const [questionOptionsType, updateQuestionOptionsType] = useState(
    block.content.questionType,
  );

  const [questionOptions, updateQuestionOptions] = useState(
    block.content.options || [],
  );

  useEffect(() => {
    updateQuestionText(block.content.text);
    updateQuestionOptionsType(block.content.questionType);
    updateQuestionOptions(block.content.options || []);
  }, [block.content.text, block.content.questionType, block.content.options]);

  const { onRemoveBlock, onUpdateBlock } = useQuizEditorContext();

  const onUpdateQuestionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuestionText(e.target.value);
  };

  const isApplyDisabled =
    block.content.text === questionText &&
    block.content.questionType === questionOptionsType &&
    JSON.stringify(block.content.options) === JSON.stringify(questionOptions);

  const onUpdateBlockAction = () => {
    onUpdateBlock({
      ...block,
      content: {
        text: questionText,
        questionType: questionOptionsType,
        options: questionOptions,
      },
    });
  };

  const onRemoveBlockAction = () => onRemoveBlock(block.id);

  const onChangeQuestionOptionsType = (option: SelectOption<QuestionType>) => {
    updateQuestionOptionsType(option.value);
  };

  const isQuestionWithOptions =
    questionOptionsType === QuestionType.Single ||
    questionOptionsType === QuestionType.Multi;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 id="question-label" className="text-xl text-gray-500">
          Question
        </h3>
        <Input
          aria-labelledby="question-label"
          value={questionText}
          onChange={onUpdateQuestionTitle}
          placeholder="Your question"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 id="question-type-label" className="text-xl text-gray-500">
          Question type
        </h3>
        <AppSelect<QuestionType>
          aria-labelledby="question-type-label"
          options={QUESTION_OPTIONS}
          value={questionOptionsType}
          onChangeAction={onChangeQuestionOptionsType}
        />
      </div>

      {isQuestionWithOptions && (
        <div className="flex flex-col gap-2">
          <h3 id="options-label" className="text-xl text-gray-500">
            Options
          </h3>
          <QuestionOptions
            ariaLabelledBy="options-label"
            options={questionOptions}
            onChangeOptionsAction={updateQuestionOptions}
          />
        </div>
      )}
      <PropertiesBlockActions
        isApplyDisabled={isApplyDisabled}
        onRemoveBlock={onRemoveBlockAction}
        onUpdateBlock={onUpdateBlockAction}
      />
    </div>
  );
};
