"use client";

import type { ChangeEvent } from "react";
import { QuizEditorControls } from "@/app/quiz/edit/_components/quiz-builder/QuizEditorControls";
import { Input } from "@/components/ui/input";
import { useQuizStore } from "@/stores/quiz.store";

export const QuizBuilderHeader = () => {
  const activeQuizTitle = useQuizStore((s) => s.draftQuiz?.title || "");
  const updateDraftQuiz = useQuizStore((s) => s.updateDraftQuiz);

  const onUpdateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    updateDraftQuiz({ title: e.target.value });
  };

  return (
    <div className="flex justify-between items-center py-4 border-b">
      <h1 className="text-xl font-bold">Quiz Editor</h1>
      <div className="mt-2 flex gap-2">
        <Input
          className="min-w-80"
          value={activeQuizTitle}
          placeholder="Quiz title"
          type="text"
          onChange={onUpdateTitle}
        />
        <QuizEditorControls />
      </div>
    </div>
  );
};
