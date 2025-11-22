import { SidebarBuilderItem } from "@/features/quiz-builder/left-sidebar/SidebarBuilderItem";
import { BUILDER_BLOCKS } from "@/features/quiz-builder/utils/configs";
import { checkIfDisabled } from "@/features/quiz-builder/utils/quizBuilder";
import { useQuizStore } from "@/stores/quiz.store";

export const QuizBuilderLeftSidebar = () => {
  const quizBlocks = useQuizStore((s) => s.draftQuiz?.blocks) || [];

  return (
    <div className="flex flex-col gap-4 pr-6 py-3">
      <h2 className="font-bold text-xl">Blocks</h2>

      <ul className="space-y-2">
        {BUILDER_BLOCKS.map((builderBlock) => {
          const isDisabled = checkIfDisabled(builderBlock.type, quizBlocks);

          return (
            <li key={builderBlock.type}>
              <SidebarBuilderItem
                builderBlock={builderBlock}
                isDisabled={isDisabled}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
