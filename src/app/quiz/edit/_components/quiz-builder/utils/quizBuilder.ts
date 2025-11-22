import type { CanvasBlocks } from "@/app/quiz/edit/_components/quiz-builder/context/QuizBuilderContext";
import { BlockType, QuestionType, type QuizBlock } from "@/lib/types/quiz";

export const createBlock = (type: BlockType): QuizBlock => {
  const id = crypto.randomUUID();

  switch (type) {
    case BlockType.Heading:
      return { id, type, content: { text: "Header text", variant: "h2" } };
    case BlockType.Question:
      return {
        id,
        type,
        content: {
          text: `Your Question ${id.slice(0, 3)}`,
          questionType: QuestionType.Single,
          options: [""],
        },
      };
    case BlockType.Button:
      return { id, type, content: { text: "Submit" } };
    case BlockType.Footer:
      return { id, type, content: { text: "Footer text" } };
    default:
      throw new Error("Unknown block type");
  }
};

const UNIQUE_BLOCKS = [
  BlockType.Heading,
  BlockType.Footer,
  BlockType.Button,
] as const;

type UniqueBlockType = (typeof UNIQUE_BLOCKS)[number];

export const checkIfDisabled = (
  type: BlockType,
  canvas: CanvasBlocks,
): boolean => {
  if (!UNIQUE_BLOCKS.includes(type as UniqueBlockType)) {
    return false;
  }

  const status: Record<UniqueBlockType, boolean> = {
    [BlockType.Heading]: !!canvas.header,
    [BlockType.Footer]: !!canvas.footer,
    [BlockType.Button]: !!canvas.button,
  };

  return status[type as UniqueBlockType];
};
