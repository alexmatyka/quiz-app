"use client";

import { createContext, type FC, useContext, useState } from "react";
import { createBlock } from "@/app/quiz/edit/_components/quiz-builder/utils/quizBuilder";
import type { BlockType, QuizBlock } from "@/lib/types/quiz";

interface QuizEditorContextType {
  canvasBlocks: QuizBlock[];
  onDropCanvasBlock: (type: BlockType) => void;
}

const QuizEditorContext = createContext<QuizEditorContextType | undefined>(
  undefined,
);

export const useQuizEditorContext = () => {
  const ctx = useContext(QuizEditorContext);
  if (!ctx)
    throw new Error("useQuizEditorContext must be used inside provider");
  return ctx;
};

export const QuizEditorProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [canvasBlocks, setCanvasBlocks] = useState<QuizBlock[]>([]);

  const onDropCanvasBlock = (type: BlockType) => {
    setCanvasBlocks((prev) => [createBlock(type), ...prev]);
  };

  return (
    <QuizEditorContext.Provider
      value={{
        canvasBlocks,
        onDropCanvasBlock,
      }}
    >
      {children}
    </QuizEditorContext.Provider>
  );
};
