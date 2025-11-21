import { Button } from "@/components/ui/button";
import type { ButtonBlock } from "@/lib/types/quiz";

type ButtonBlockRendererProps = {
  block: ButtonBlock;
};

export const ButtonBlockRenderer = ({ block }: ButtonBlockRendererProps) => {
  return (
    <Button variant="default" className="w-full">
      {block.content.text}
    </Button>
  );
};
