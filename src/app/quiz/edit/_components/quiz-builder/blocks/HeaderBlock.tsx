import type { HeadingBlock } from "@/lib/types/quiz";

type HeaderBlockRendererProps = {
  block: HeadingBlock;
};

export const HeaderBlockRenderer = ({ block }: HeaderBlockRendererProps) => {
  const Header = block.content.variant || "h1";

  return (
    <div className="p-5 border-1 border-gray-300">
      <Header>{block.content.text}</Header>
    </div>
  );
};
