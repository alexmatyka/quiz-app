import { BlockType, type QuizBlock } from "@/lib/types/quiz";

export const getQuizBlocks = (blocks: QuizBlock[]) => {
  const header = blocks.find((b) => b.type === BlockType.Heading);
  const footer = blocks.find((b) => b.type === BlockType.Footer);
  const button = blocks.find((b) => b.type === BlockType.Button);
  const questions = blocks.filter((b) => b.type === BlockType.Question);

  return { header, footer, button, questions };
};
