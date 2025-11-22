import { Button } from "@/components/ui/button";

type PropertiesBlockActionsProps = {
  isApplyDisabled: boolean;
  onUpdateBlock: () => void;
  onRemoveBlock: () => void;
};

export const PropertiesBlockActions = ({
  isApplyDisabled,
  onUpdateBlock,
  onRemoveBlock,
}: PropertiesBlockActionsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        size="sm"
        variant="success"
        className="cursor-pointer w-full"
        disabled={isApplyDisabled}
        onClick={onUpdateBlock}
      >
        Apply changes
      </Button>
      <Button
        size="sm"
        variant="danger"
        className="cursor-pointer w-full"
        onClick={onRemoveBlock}
      >
        Remove block
      </Button>
    </div>
  );
};
