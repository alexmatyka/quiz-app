"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useQuizStore } from "@/stores/quizzes.store";
import { QuizTable } from "./QuizTable";

// For the production version, make this component a server component
// and fetch quizzes via a server request from the parent through context + zustand.
// For the purposes of this test assignment, we are tied to a service that works with localStorage, so the component is client-side.
export const HomePageContent = () => {
  const quizzes = useQuizStore((s) => s.quizzes);
  const isLoading = useQuizStore((s) => s.isLoading);
  const fetchQuizzes = useQuizStore((s) => s.fetchQuizzes);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-full" aria-live="polite">
        <span className="sr-only">Loading...</span>
        <Spinner className="border-secondary-foreground h-8 w-8" />
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No quizzes found. Get started by creating one!
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-ds-black text-4xl font-semibold mb-4">Quiz List</h1>
      <QuizTable quizzes={quizzes} />
    </div>
  );
};
