"use client";

import { createContext, type FC, useContext, useState } from "react";
import { createBlock } from "@/app/quiz/edit/_components/quiz-builder/utils/quizBuilder";
import {
  BlockType,
  type ButtonBlock,
  type FooterBlock,
  type HeadingBlock,
  type QuestionBlock,
} from "@/lib/types/quiz";

export type CanvasBlocks = {
  header: HeadingBlock | null;
  questions: QuestionBlock[];
  footer: FooterBlock | null;
  button: ButtonBlock | null;
};

interface QuizEditorContextType {
  canvasBlocks: CanvasBlocks;
  onDropCanvasBlock: (type: BlockType) => void;
  onReorderQuestions: (questions: QuestionBlock[]) => void;
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
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlocks>({
    header: null,
    questions: [],
    footer: null,
    button: null,
  });

  const onReorderQuestions = (questions: QuestionBlock[]) => {
    setCanvasBlocks((prev) => ({ ...prev, questions }));
  };

  const onDropCanvasBlock = (type: BlockType) => {
    const block = createBlock(type);

    // We can add type guards instead casting here
    switch (type) {
      case BlockType.Heading:
        setCanvasBlocks((prev) => ({ ...prev, header: block as HeadingBlock }));
        break;
      case BlockType.Question:
        setCanvasBlocks((prev) => ({
          ...prev,
          questions: [...prev.questions, block as QuestionBlock],
        }));
        break;
      case BlockType.Footer:
        setCanvasBlocks((prev) => ({ ...prev, footer: block as FooterBlock }));
        break;
      case BlockType.Button:
        setCanvasBlocks((prev) => ({ ...prev, button: block as ButtonBlock }));
        break;
    }
  };

  return (
    <QuizEditorContext.Provider
      value={{
        canvasBlocks,
        onDropCanvasBlock,
        onReorderQuestions,
      }}
    >
      {children}
    </QuizEditorContext.Provider>
  );
};
