"use client";

import { useEffect } from "react";
import { QuizStatusWrapper } from "@/app/quiz/[id]/_components/QuizStatusWrapper";
import { useQuizStore } from "@/stores/quiz.store";

type ViewQuizPageContentProps = {
  quizId: string;
};

// Server-side render all non-interactive parts, but since this is a localStorage-based test task,
// we sync the interactive state with Zustand on the client and show not found page on the client as well
export const ViewQuizPageContent = ({ quizId }: ViewQuizPageContentProps) => {
  const activeQuiz = useQuizStore((s) => s.activeQuiz);
  const fetchQuiz = useQuizStore((s) => s.fetchQuiz);
  const isLoading = useQuizStore((s) => s.isLoading);

  useEffect(() => {
    fetchQuiz(quizId);
  }, [quizId, fetchQuiz]);

  return (
    <QuizStatusWrapper quiz={activeQuiz} isLoading={isLoading}>
      {activeQuiz?.title}
    </QuizStatusWrapper>
  );
};
