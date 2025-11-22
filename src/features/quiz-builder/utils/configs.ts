import {
  Heading,
  PanelBottom,
  SquareMousePointer,
  SquarePen,
} from "lucide-react";
import {
  BlockType,
  type HeadingBlockVariants,
  QuestionType,
} from "@/lib/types/quiz";

export const BUILDER_BLOCKS = [
  {
    label: "Heading",
    type: BlockType.Heading,
    icon: Heading,
  },
  {
    label: "Question",
    type: BlockType.Question,
    icon: SquarePen,
  },
  {
    label: "Footer",
    type: BlockType.Footer,
    icon: PanelBottom,
  },
  {
    label: "Button",
    type: BlockType.Button,
    icon: SquareMousePointer,
  },
] as const;

export const HEADING_OPTIONS: { label: string; value: HeadingBlockVariants }[] =
  [
    { label: "h1", value: "h1" },
    { label: "h2", value: "h2" },
    { label: "h3", value: "h3" },
  ];

export const QUESTION_OPTIONS: {
  label: string;
  value: QuestionType;
}[] = [
  { label: "Single", value: QuestionType.Single },
  { label: "Multiple", value: QuestionType.Multi },
  { label: "Tex", value: QuestionType.Text },
];
