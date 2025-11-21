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

export type HeadingBlock = BaseBlock & {
  type: BlockType.Heading;
  content: {
    text: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };
};

export type QuestionBlock = BaseBlock & {
  type: BlockType.Question;
  content: {
    text: string;
    questionType: QuestionType;
    options?: string[];
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
