import { headingSizes } from "@/features/quiz-renderer/utils";
import type { HeadingBlock } from "@/lib/types/quiz";

type HeaderBlockProps = {
  block: HeadingBlock;
};

export const HeaderBlock = ({ block }: HeaderBlockProps) => {
  const Header = block.content.variant || "h3";

  const sizeClass = headingSizes[Header];

  return (
    <div className="p-4 border-b">
      <Header className={sizeClass}>{block.content.text}</Header>
    </div>
  );
};
