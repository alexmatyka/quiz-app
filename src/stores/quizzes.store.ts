import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Quiz } from "@/lib/types/quiz";
import { getQuizzes } from "@/services/quiz.service";

interface QuizzesStore {
  quizzes: Quiz[];
  isLoading: boolean;
  addQuiz: (quiz: Quiz) => void;
  fetchQuizzes: () => void;
  updateRefetchTrigger: () => void;
  refetchTrigger: number;
}

export const useQuizzesStore = create<QuizzesStore>()(
  devtools((set) => ({
    quizzes: [],
    isLoading: true,
    refetchTrigger: 0,

    updateRefetchTrigger: () => {
      set((state) => ({
        refetchTrigger: state.refetchTrigger + 1,
      }));
    },
    fetchQuizzes: () => {
      try {
        const quizzes = getQuizzes();
        set({ quizzes, isLoading: false });
      } catch {
        set({ quizzes: [] });
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
