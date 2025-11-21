import { QuizBuilderCanvas } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilderCanvas";
import { QuizBuilderHeader } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilderHeader";
import { QuizBuilderLeftSidebar } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilderLeftSidebar";
import { QuizBuilderPropertiesBar } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilderPropertiesBar";

export const QuizBuilder = () => {
  return (
    <div className="flex flex-col gap-6">
      <QuizBuilderHeader />
      <div className="flex gap-5" style={{ height: "calc(100vh - 320px)" }}>
        <div className="w-45 flex-shrink-0 flex flex-col gap-4">
          <QuizBuilderLeftSidebar />
        </div>
        <div className="flex-1 min-w-60 bg-gray-50 rounded-lg overflow-auto">
          <QuizBuilderCanvas />
        </div>
        <div className="w-85 flex-shrink-0 flex flex-col gap-4">
          <QuizBuilderPropertiesBar />
        </div>
      </div>
    </div>
  );
};
