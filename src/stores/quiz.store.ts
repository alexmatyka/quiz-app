import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Quiz } from "@/lib/types/quiz";
import { getQuizzes } from "@/services/quiz.service";

interface QuizStore {
  quizzes: Quiz[];
  currentQuizId: string | null;
  isLoading: boolean;

  addQuiz: (quiz: Quiz) => void;
  fetchQuizzes: () => void;
  updateQuiz: (id: string, data: Partial<Quiz>) => void;
  deleteQuiz: (id: string) => void;
  setCurrentQuiz: (id: string | null) => void;
}

export const useQuizStore = create<QuizStore>()(
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

    addQuiz: (newQuiz: Quiz) =>
      set((state) => ({ quizzes: [...state.quizzes, newQuiz] })),

    updateQuiz: (id, data) =>
      set((state) => ({
        quizzes: state.quizzes.map((q) =>
          q.id === id ? { ...q, ...data } : q,
        ),
      })),

    deleteQuiz: (id) =>
      set((state) => ({
        quizzes: state.quizzes.filter((q) => q.id !== id),
      })),

    setCurrentQuiz: (id) => set({ currentQuizId: id }),
  })),
);
