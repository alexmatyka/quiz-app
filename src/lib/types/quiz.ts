export enum BlockType {
  Heading = "heading",
  Question = "question",
  Button = "button",
  Footer = "footer",
}

export enum QuestionType {
  Single = "single",
  Multi = "multi",
  Text = "text",
}

export type BaseBlock = {
  id: string;
  type: BlockType;
};

export type HeadingBlockVariants = "h1" | "h2" | "h3";

export type HeadingBlock = BaseBlock & {
  type: BlockType.Heading;
  content: {
    text: string;
    variant: HeadingBlockVariants;
  };
};

export type QuestionOption = { id: string; value: string };

export type QuestionBlock = BaseBlock & {
  type: BlockType.Question;
  content: {
    text: string;
    questionType: QuestionType;
    options?: QuestionOption[];
  };
};

export type ButtonBlock = BaseBlock & {
  type: BlockType.Button;
  content: {
    text: string;
  };
};

export type FooterBlock = BaseBlock & {
  type: BlockType.Footer;
  content: {
    text: string;
  };
};

export type QuizBlock =
  | HeadingBlock
  | QuestionBlock
  | ButtonBlock
  | FooterBlock;

export type Quiz = {
  id: string;
  title: string;
  blocks: QuizBlock[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type QuestionUserAnswer =
  | QuestionSingleAnswer
  | QuestionMultiAnswer
  | QuestionTextAnswer;
export type QuestionSingleAnswer = {
  type: QuestionType.Single;
  value: string;
};

export type QuestionMultiAnswer = {
  type: QuestionType.Multi;
  value: string[];
};

export type QuestionTextAnswer = {
  type: QuestionType.Text;
  value: string;
};
