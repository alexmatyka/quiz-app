"use client";

import { QuizEditorProvider } from "@/features/quiz-builder/context/QuizBuilderContext";
import { QuizBuilderHeader } from "@/features/quiz-builder/header/QuizBuilderHeader";
import { QuizBuilderLeftSidebar } from "@/features/quiz-builder/left-sidebar/QuizBuilderLeftSidebar";
import { QuizBuilderPropertiesBar } from "@/features/quiz-builder/properties-section/QuizBuilderPropertiesBar";
import { QuizBuilderCanvas } from "@/features/quiz-builder/QuizBuilderCanvas";
import { QuizBuilderDndProvider } from "@/features/quiz-builder/wrappers/QuizBuilderDndProvider";

const QUIZ_HEADER_HEIGHT = 320;

export const QuizBuilder = () => {
  return (
    <div className="flex flex-col gap-6">
      <QuizBuilderHeader />
      <QuizEditorProvider>
        <section
          aria-label="Quiz builder workspace"
          className="flex gap-5"
          style={{ height: `calc(100vh - ${QUIZ_HEADER_HEIGHT}px` }}
        >
          <QuizBuilderDndProvider>
            <aside
              className="w-45 flex-shrink-0 flex flex-col gap-4"
              aria-label="Available blocks"
            >
              <QuizBuilderLeftSidebar />
            </aside>
            <section
              aria-label="Editor canvas"
              className="flex-1 min-w-60 bg-gray-50 rounded-lg"
            >
              <QuizBuilderCanvas />
            </section>
          </QuizBuilderDndProvider>
          <aside
            className="w-90 flex-shrink-0 flex flex-col gap-4"
            aria-label="Block properties"
          >
            <QuizBuilderPropertiesBar />
          </aside>
        </section>
      </QuizEditorProvider>
    </div>
  );
};
