import type { FooterBlock } from "@/lib/types/quiz";

type FooterBlockRendererProps = {
  block: FooterBlock;
};

export const FooterBlockRenderer = ({ block }: FooterBlockRendererProps) => {
  return (
    <div className="p-5 border-1 border-gray-300">
      <p>{block.content.text}</p>
    </div>
  );
};
