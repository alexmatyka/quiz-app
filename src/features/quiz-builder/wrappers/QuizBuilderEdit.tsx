"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { QuizBuilder } from "@/features/quiz-builder/QuizBuilder";
import { useQuizStore } from "@/stores/quiz.store";

type QuizBuilderEditProps = {
  quizId: string;
};

export const QuizBuilderEdit = (props: QuizBuilderEditProps) => {
  const fetchQuiz = useQuizStore((s) => s.fetchQuiz);
  const isLoading = useQuizStore((s) => s.isLoading);
  const resetQuizStore = useQuizStore((s) => s.resetQuizStore);
  const refetchTrigger = useQuizStore((s) => s.refetchTrigger);

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to re-run sync after publish/unpublish
  useEffect(() => {
    fetchQuiz(props.quizId);
  }, [props.quizId, fetchQuiz, resetQuizStore, refetchTrigger]);

  useEffect(() => {
    return () => {
      resetQuizStore();
    };
  }, [resetQuizStore]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-full" aria-live="polite">
        <span className="sr-only">Loading...</span>
        <Spinner className="border-secondary-foreground h-8 w-8" />
      </div>
    );
  }

  return <QuizBuilder />;
};
