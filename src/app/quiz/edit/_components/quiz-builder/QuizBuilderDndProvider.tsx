"use client";

import { type DragDropEventHandlers, DragDropProvider } from "@dnd-kit/react";

import type { ReactNode } from "react";
import { useQuizEditorContext } from "@/app/quiz/edit/_components/quiz-builder/context/QuizBuilderContext";
import type { BlockType } from "@/lib/types/quiz";

type DragEndEvent = Parameters<DragDropEventHandlers["onDragEnd"]>[0];

export const DROPPABLE_ZONE_ID = "quiz_droppable";

export function QuizBuilderDndProvider({ children }: { children: ReactNode }) {
  const { onDropCanvasBlock } = useQuizEditorContext();

  const onDragEnd = (event: DragEndEvent) => {
    const elementType = event.operation.source?.id;
    const { target } = event.operation;

    if (event.canceled || target?.id !== DROPPABLE_ZONE_ID) return;

    if (!elementType) return;

    onDropCanvasBlock(elementType as BlockType);
  };

  return <DragDropProvider onDragEnd={onDragEnd}>{children}</DragDropProvider>;
}
