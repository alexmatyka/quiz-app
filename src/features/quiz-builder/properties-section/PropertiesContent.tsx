import { ButtonPropertiesBlock } from "@/features/quiz-builder/properties-section/button-properties/ButtonPropertiesBlock";
import { FooterPropertiesBlock } from "@/features/quiz-builder/properties-section/footer-properties/FooterPropertiesBlock";
import { HeadingPropertiesBlock } from "@/features/quiz-builder/properties-section/header-properties/HeadingPropertiesBlock";
import { QuestionPropertiesBlock } from "@/features/quiz-builder/properties-section/question-properties/QuestionPropertiesBlock";
import { BlockType, type QuizBlock } from "@/lib/types/quiz";

type PropertiesContentProps = {
  selectedBlock: QuizBlock;
};

export const PropertiesContent = ({
  selectedBlock,
}: PropertiesContentProps) => {
  switch (selectedBlock.type) {
    case BlockType.Heading:
      return <HeadingPropertiesBlock block={selectedBlock} />;
    case BlockType.Footer:
      return <FooterPropertiesBlock block={selectedBlock} />;
    case BlockType.Question:
      return <QuestionPropertiesBlock block={selectedBlock} />;
    case BlockType.Button:
      return <ButtonPropertiesBlock block={selectedBlock} />;
    default:
      return null;
  }
};
