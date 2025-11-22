"use client";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useRef } from "react";
import { Droppable, Sortable } from "@/components/DnDComponents";
import {
  DROPPABLE_ZONE_ID,
  useQuizEditorContext,
} from "@/features/quiz-builder/context/QuizBuilderContext";
import { ButtonBlockRenderer } from "@/features/quiz-builder/droppable-area-blocks/ButtonBlock";
import { FooterBlockRenderer } from "@/features/quiz-builder/droppable-area-blocks/FooterBlock";
import { HeaderBlockRenderer } from "@/features/quiz-builder/droppable-area-blocks/HeaderBlock";
import { QuestionBlockRenderer } from "@/features/quiz-builder/droppable-area-blocks/QuestionBlock";
import { BlockType } from "@/lib/types/quiz";
import { useQuizStore } from "@/stores/quiz.store";

export const QuizBuilderCanvas = () => {
  const { onReorderQuestions, setSelectedBlock, selectedBlock } =
    useQuizEditorContext();
  const quizBlocks = useQuizStore((s) => s.draftQuiz?.blocks) || [];
  const questionsContainerRef = useRef<HTMLDivElement>(null);

  const header = quizBlocks.find((block) => block.type === BlockType.Heading);
  const footer = quizBlocks.find((block) => block.type === BlockType.Footer);
  const button = quizBlocks.find((block) => block.type === BlockType.Button);
  const questions = quizBlocks.filter(
    (block) => block.type === BlockType.Question,
  );

  return (
    <div className="flex flex-col w-full h-full px-6 py-4 overflow-y-auto">
      <div className="mb-2 text-gray-600 font-medium">Droppable Area</div>
      <Droppable
        aria-label="Drop area"
        id={DROPPABLE_ZONE_ID}
        className="w-full flex flex-col flex-grow gap-4 p-4 border-2 border-dashed rounded-lg transition-colors border-gray-300 bg-white"
        dropClassName="border-blue-400 bg-blue-50"
      >
        {header && (
          <HeaderBlockRenderer
            block={header}
            onClick={setSelectedBlock}
            isActive={selectedBlock?.id === header.id}
          />
        )}

        <DragDropProvider
          onDragEnd={(event) => {
            const newItems = move(questions, event);
            onReorderQuestions(newItems);
          }}
        >
          <div ref={questionsContainerRef} className="flex flex-col gap-4 ">
            {questions.map((question, questionIndex) => (
              <Sortable
                key={question.id}
                id={question.id}
                index={questionIndex}
                containerRef={questionsContainerRef}
              >
                <QuestionBlockRenderer
                  block={question}
                  onClick={setSelectedBlock}
                  isActive={selectedBlock?.id === question.id}
                />
              </Sortable>
            ))}
          </div>
        </DragDropProvider>

        {footer && (
          <FooterBlockRenderer
            block={footer}
            onClick={setSelectedBlock}
            isActive={selectedBlock?.id === footer.id}
          />
        )}
        {button && (
          <ButtonBlockRenderer
            block={button}
            onClick={setSelectedBlock}
            isActive={selectedBlock?.id === button.id}
          />
        )}
      </Droppable>
    </div>
  );
};
