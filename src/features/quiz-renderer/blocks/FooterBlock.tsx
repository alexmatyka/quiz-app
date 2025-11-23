import type { FooterBlock } from "@/lib/types/quiz";

type FooterBlockProps = {
  block: FooterBlock;
};

export const FooterBlockComponent = ({ block }: FooterBlockProps) => {
  return (
    <div className="py-4 px-1 text-[18px] text-gray-600 border-t">
      {block.content.text}
    </div>
  );
};
