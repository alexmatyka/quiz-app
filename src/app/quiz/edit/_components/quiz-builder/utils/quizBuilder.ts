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
          text: "",
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

const UNIQUE_BLOCKS: BlockType[] = [
  BlockType.Heading,
  BlockType.Footer,
  BlockType.Button,
];

export const checkIfDisabled = (type: BlockType, canvasBlocks: QuizBlock[]) => {
  if (!UNIQUE_BLOCKS.includes(type)) return false;

  return canvasBlocks.some((b) => b.type === type);
};
