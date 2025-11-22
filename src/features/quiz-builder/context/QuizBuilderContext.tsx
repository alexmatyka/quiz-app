"use client";

import type { DragDropEventHandlers } from "@dnd-kit/react";
import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useState,
} from "react";
import {
  createBlock,
  isBlockType,
} from "@/features/quiz-builder/utils/quizBuilder";
import { BlockType, type QuizBlock } from "@/lib/types/quiz";
import { useQuizStore } from "@/stores/quiz.store";

export const DROPPABLE_ZONE_ID = "quiz_droppable";

type DragEndEvent = Parameters<DragDropEventHandlers["onDragEnd"]>[0];

interface QuizEditorContextType {
  draftBlocks: QuizBlock[];
  selectedBlock: QuizBlock | null;
  setSelectedBlock: (block: QuizBlock | null) => void;
  onUpdateBlock: (block: QuizBlock) => void;
  onRemoveBlock: (blockId: string) => void;
  onReorderQuestions: (questions: QuizBlock[]) => void;
  onDragEndAndCreateBlock: (event: DragEndEvent) => void;
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

export const QuizEditorProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const draftQuiz = useQuizStore((s) => s.draftQuiz);
  const updateDraftQuiz = useQuizStore((s) => s.updateDraftQuiz);

  const [selectedBlock, setSelectedBlock] = useState<QuizBlock | null>(null);

  const draftBlocks = draftQuiz?.blocks ?? [];

  const onDropBlock = (type: BlockType) => {
    const newBlock = createBlock(type);
    updateDraftQuiz({ blocks: [...draftBlocks, newBlock] });
  };

  const onDragEndAndCreateBlock = (event: DragEndEvent) => {
    const elementType = event.operation.source?.id;
    const { target } = event.operation;

    if (event.canceled || target?.id !== DROPPABLE_ZONE_ID || !elementType) {
      return;
    }

    if (isBlockType(elementType)) onDropBlock(elementType);
  };

  const onUpdateBlock = (updatedBlock: QuizBlock) => {
    updateDraftQuiz({
      blocks: draftBlocks.map((b) =>
        b.id === updatedBlock.id ? updatedBlock : b,
      ),
    });

    setSelectedBlock(updatedBlock);
  };

  const onRemoveBlock = (blockId: string) => {
    updateDraftQuiz({
      blocks: draftBlocks.filter((b) => b.id !== blockId),
    });

    setSelectedBlock((el) => (el?.id === blockId ? null : el));
  };

  const onReorderQuestions = (questions: QuizBlock[]) => {
    const nonQuestionBlocks = draftBlocks.filter(
      (b) => b.type !== BlockType.Question,
    );
    updateDraftQuiz({ blocks: [...nonQuestionBlocks, ...questions] });
  };

  return (
    <QuizEditorContext.Provider
      value={{
        draftBlocks,
        selectedBlock,
        setSelectedBlock,
        onDragEndAndCreateBlock,
        onUpdateBlock,
        onRemoveBlock,
        onReorderQuestions,
      }}
    >
      {children}
    </QuizEditorContext.Provider>
  );
};
