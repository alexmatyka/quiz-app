"use client";

import { useQuizEditorContext } from "@/features/quiz-builder/context/QuizBuilderContext";
import { PropertiesContent } from "@/features/quiz-builder/properties-section/PropertiesContent";

export const QuizBuilderPropertiesBar = () => {
  const { selectedBlock } = useQuizEditorContext();

  if (!selectedBlock) {
    return (
      <div className="p-4 text-gray-500">
        Select block on canvas to start editing
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-xl">Properties</h2>
      <PropertiesContent selectedBlock={selectedBlock} />
    </div>
  );
};
