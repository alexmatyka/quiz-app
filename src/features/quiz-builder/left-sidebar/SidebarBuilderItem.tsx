import { memo } from "react";
import { Draggable } from "@/components/DnDComponents";
import type { BUILDER_BLOCKS } from "@/features/quiz-builder/utils/configs";
import { cn } from "@/lib/utils";

type SidebarBuilderItemProps = {
  builderBlock: (typeof BUILDER_BLOCKS)[number];
  isDisabled: boolean;
};

export const SidebarBuilderItem = memo(
  ({ builderBlock, isDisabled }: SidebarBuilderItemProps) => {
    const Icon = builderBlock.icon;

    return (
      <Draggable id={builderBlock.type} isDisabled={isDisabled}>
        {/*  biome-ignore lint/a11y/useSemanticElements: use div for custom styling */}
        <div
          role="button"
          aria-disabled={isDisabled}
          tabIndex={0}
          className={cn(
            "flex items-center gap-2 py-2 px-3 rounded-lg cursor-grab select-none transition-all",
            !isDisabled && "hover:bg-accent/50 hover:shadow",
            isDisabled && "cursor-not-allowed text-gray-400 bg-gray-50",
          )}
        >
          <Icon
            className="w-5 h-5 text-muted-foreground"
            aria-hidden="true"
            focusable={false}
          />
          <span aria-disabled={isDisabled} className="text-sm">
            {builderBlock.label}
          </span>
        </div>
      </Draggable>
    );
  },
);
