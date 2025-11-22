"use client";

import { DragDropProvider } from "@dnd-kit/react";
import type { ReactNode } from "react";
import { useQuizEditorContext } from "@/features/quiz-builder/context/QuizBuilderContext";

export function QuizBuilderDndProvider({ children }: { children: ReactNode }) {
  const { onDragEndAndCreateBlock } = useQuizEditorContext();

  return (
    <DragDropProvider onDragEnd={onDragEndAndCreateBlock}>
      {children}
    </DragDropProvider>
  );
}
