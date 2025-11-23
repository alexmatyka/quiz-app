import { type ChangeEvent, useEffect, useState } from "react";
import { AppSelect, type SelectOption } from "@/components/AppSelect";
import { Checkbox } from "@/components/ui/checkbox";
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
// If it grows, consider moving data to zustand ( quizQuestionConfig field ) and split components
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

  const [isMandatory, setMandatory] = useState(!!block.content.isMandatory);

  useEffect(() => {
    updateQuestionText(block.content.text);
    updateQuestionOptionsType(block.content.questionType);
    updateQuestionOptions(block.content.options || []);
    setMandatory(!!block.content.isMandatory);
  }, [
    block.content.text,
    block.content.questionType,
    block.content.options,
    block.content.isMandatory,
  ]);

  const { onRemoveBlock, onUpdateBlock } = useQuizEditorContext();

  const onUpdateQuestionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateQuestionText(e.target.value);
  };

  const isApplyDisabled =
    block.content.text === questionText &&
    block.content.questionType === questionOptionsType &&
    JSON.stringify(block.content.options || []) ===
      JSON.stringify(questionOptions) &&
    !!block.content.isMandatory === isMandatory;

  const onUpdateBlockAction = () => {
    onUpdateBlock({
      ...block,
      content: {
        text: questionText,
        questionType: questionOptionsType,
        options: questionOptions,
        isMandatory,
      },
    });
  };

  const onRemoveBlockAction = () => onRemoveBlock(block.id);

  const onChangeQuestionOptionsType = (option: SelectOption<QuestionType>) => {
    updateQuestionOptionsType(option.value);
  };

  const onChangeQuestionMandatory = () => setMandatory((prev) => !prev);

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

      <div className="flex gap-2 items-center">
        <Checkbox
          id="mandatory-checkbox"
          checked={isMandatory}
          onCheckedChange={onChangeQuestionMandatory}
          className="
                h-5 w-5
                border-2 border-gray-500
                data-[state=checked]:bg-blue-600
                data-[state=checked]:border-blue-600
              "
        />
        <label
          htmlFor="mandatory-checkbox"
          className="cursor-pointer text-gray-800"
        >
          Is mandatory?
        </label>
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
