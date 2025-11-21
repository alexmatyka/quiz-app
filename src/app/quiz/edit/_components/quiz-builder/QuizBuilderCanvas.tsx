"use client";

import { move } from "@dnd-kit/helpers";
import { DragDropProvider, useDraggable } from "@dnd-kit/react";
import { useState } from "react";
import { ButtonBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/ButtonBlock";
import { FooterBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/FooterBlock";
import { HeaderBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/HeaderBlock";
import { QuestionBlockRenderer } from "@/app/quiz/edit/_components/quiz-builder/blocks/QuestionBlock";
import { useQuizEditorContext } from "@/app/quiz/edit/_components/quiz-builder/context/QuizBuilderContext";
import { DROPPABLE_ZONE_ID } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilderDndProvider";
import { Droppable, Sortable } from "@/components/DnDComponents";
import { BlockType } from "@/lib/types/quiz";

export const QuizBuilderCanvas = () => {
  const { canvasBlocks } = useQuizEditorContext();

  const header = canvasBlocks.find((b) => b.type === BlockType.Heading);
  const footer = canvasBlocks.find((b) => b.type === BlockType.Footer);
  const button = canvasBlocks.find((b) => b.type === BlockType.Button);
  const questions = canvasBlocks.filter((b) => b.type === BlockType.Question);

  return (
    <div className="flex flex-col w-full h-full px-6 py-4">
      <div className="mb-2 text-gray-600 font-medium">Dropable Area</div>

      <Droppable
        aria-label="Drop area"
        id={DROPPABLE_ZONE_ID}
        className="w-full h-full flex flex-col gap-4 p-4 flex-1 border-2 border-dashed rounded-lg transition-colors border-gray-300 bg-white"
        dropClassName="border-blue-400 bg-blue-50"
      >
        {header && <HeaderBlockRenderer block={header} />}

        {/*      <DragDropProvider
            onDragEnd={(event) => {
              debugger;
            }}
          >
            {questions.map((q, i) => (
              <Sortable key={q.id} id={q.id} index={i}>
                <QuestionBlockRenderer block={q} />
              </Sortable>
            ))}
          </DragDropProvider>*/}

        {footer && <FooterBlockRenderer block={footer} />}
        {button && <ButtonBlockRenderer block={button} />}
      </Droppable>
    </div>
  );
};
