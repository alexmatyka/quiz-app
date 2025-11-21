import { BUILDER_BLOCKS } from "@/app/quiz/edit/_components/quiz-builder/utils/configs";
import { cn } from "@/lib/utils";

export const QuizBuilderLeftSidebar = () => {
  return (
    <div className="flex flex-col gap-4 pr-6 py-3">
      <h3 className="font-bold text-xl">Blocks</h3>

      <div className="space-y-2">
        {BUILDER_BLOCKS.map((block) => {
          const Icon = block.icon;

          return (
            <div
              key={block.type}
              className={cn(
                "flex items-center gap-2 py-2 px-3 rounded-lg cursor-grab select-none",
                "hover:bg-accent/50 hover:shadow transition-all",
              )}
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{block.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
