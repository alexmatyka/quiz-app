"use client";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { ButtonBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/ButtonBlock";
import { FooterBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/FooterBlock";
import { HeaderBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/HeaderBlock";
import { QuestionBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/QuestionBlock";
import { useQuizEditorContext } from "@/app/quiz/edit/_components/quiz-builder/context/QuizBuilderContext";
import { DROPPABLE_ZONE_ID } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilderDndProvider";
import { Droppable, Sortable } from "@/components/DnDComponents";

export const QuizBuilderCanvas = () => {
  const { canvasBlocks, onReorderQuestions } = useQuizEditorContext();

  return (
    <div className="flex flex-col w-full h-full px-6 py-4">
      <div className="mb-2 text-gray-600 font-medium">Dropable Area</div>

      <Droppable
        aria-label="Drop area"
        id={DROPPABLE_ZONE_ID}
        className="w-full h-full flex flex-col gap-4 p-4 flex-1 border-2 border-dashed rounded-lg transition-colors border-gray-300 bg-white"
        dropClassName="border-blue-400 bg-blue-50"
      >
        {canvasBlocks.header && (
          <HeaderBlockRenderer block={canvasBlocks.header} />
        )}

        <DragDropProvider
          onDragEnd={(event) => {
            const newItems = move(canvasBlocks.questions, event);
            onReorderQuestions(newItems);
          }}
        >
          {canvasBlocks.questions.map((q, i) => (
            <Sortable key={q.id} id={q.id} index={i}>
              <QuestionBlockRenderer block={q} />
            </Sortable>
          ))}
        </DragDropProvider>

        <div>{JSON.stringify(canvasBlocks.questions)}</div>

        {canvasBlocks.footer && (
          <FooterBlockRenderer block={canvasBlocks.footer} />
        )}
        {canvasBlocks.button && (
          <ButtonBlockRenderer block={canvasBlocks.button} />
        )}
      </Droppable>
    </div>
  );
};
