"use client";

import { useEffect } from "react";
import { QuizBuilder } from "@/features/quiz-builder/QuizBuilder";
import { useQuizStore } from "@/stores/quiz.store";

export const QuizBuilderCreate = () => {
  const resetQuizStore = useQuizStore((s) => s.resetQuizStore);

  useEffect(() => {
    return () => {
      resetQuizStore();
    };
  }, [resetQuizStore]);

  return <QuizBuilder />;
};
