import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Quiz } from "@/lib/types/quiz";
import { getQuizById } from "@/services/quiz.service";

interface QuizStore {
  activeQuiz: Quiz | null;
  isLoading: boolean;
  fetchQuiz: (quizId: string) => void;
}

export const useQuizStore = create<QuizStore>()(
  devtools((set) => ({
    activeQuiz: null,
    currentQuizId: null,
    isLoading: true,

    fetchQuiz: (quizId: string) => {
      try {
        const activeQuiz = getQuizById(quizId);
        set({ activeQuiz, isLoading: false });
      } catch (e) {
        console.error("Failed to load quiz", e);
        set({ activeQuiz: null, isLoading: false });
      }
    },
  })),
);
