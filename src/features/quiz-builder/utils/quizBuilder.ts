import type { UniqueIdentifier } from "@dnd-kit/core";
import { BlockType, QuestionType, type QuizBlock } from "@/lib/types/quiz";

export const createBlock = (type: BlockType): QuizBlock => {
  const id = crypto.randomUUID();

  switch (type) {
    case BlockType.Heading:
      return { id, type, content: { text: "Header text here", variant: "h2" } };
    case BlockType.Question:
      return {
        id,
        type,
        content: {
          text: "Question text here",
          questionType: QuestionType.Text,
          options: [],
        },
      };
    case BlockType.Button:
      return { id, type, content: { text: "Submit" } };
    case BlockType.Footer:
      return { id, type, content: { text: "Footer text here" } };
    default:
      throw new Error("Unknown block type");
  }
};

const UNIQUE_BLOCKS = [BlockType.Heading, BlockType.Footer, BlockType.Button];

type UniqueBlockType = (typeof UNIQUE_BLOCKS)[number];

export const checkIfDisabled = (
  type: BlockType,
  quizBlocks: QuizBlock[],
): boolean => {
  if (!UNIQUE_BLOCKS.includes(type as UniqueBlockType)) {
    return false;
  }

  return quizBlocks.some((b) => b.type === type);
};

export function isBlockType(
  value: UniqueIdentifier | undefined,
): value is BlockType {
  return Object.values(BlockType).includes(value as BlockType);
}
