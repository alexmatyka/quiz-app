import {
  Heading,
  PanelBottom,
  SquareMousePointer,
  SquarePen,
} from "lucide-react";
import { BlockType } from "@/lib/types/quiz";

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
