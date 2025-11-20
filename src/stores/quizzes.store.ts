import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Quiz } from "@/lib/types/quiz";
import { getQuizzes } from "@/services/quiz.service";

interface QuizzesStore {
  quizzes: Quiz[];
  currentQuizId: string | null;
  isLoading: boolean;

  addQuiz: (quiz: Quiz) => void;
  fetchQuizzes: () => void;
}

export const useQuizStore = create<QuizzesStore>()(
  devtools((set) => ({
    quizzes: [],
    currentQuizId: null,
    isLoading: true,

    fetchQuizzes: () => {
      try {
        const quizzes = getQuizzes();
        set({ quizzes, isLoading: false });
      } catch (e) {
        console.error("Failed to load quizzes", e);
        set({ quizzes: [], isLoading: false });
      }
    },
  })),
);
