import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Quiz } from "@/lib/types/quiz";
import { getQuizById } from "@/services/quiz.service";

interface QuizStore {
  activeQuiz: Quiz | null; // The saved quiz (source of truth)
  draftQuiz: Partial<Quiz> | null; // Editable copy for making changes, can reset to activeQuiz if needed
  isLoading: boolean;
  refetchTrigger: number;

  fetchQuiz: (quizId: string) => void;
  updateDraftQuiz: (quiz: Partial<Quiz>) => void;
  updateLoading: (isLoading: boolean) => void;
  updateRefetchTrigger: () => void;
}

export const useQuizStore = create<QuizStore>()(
  devtools((set) => ({
    activeQuiz: null,
    currentQuizId: null,
    isLoading: true,
    refetchTrigger: 0,

    updateRefetchTrigger: () => {
      set((state) => ({
        refetchTrigger: state.refetchTrigger + 1,
      }));
    },

    updateLoading: (isLoading: boolean) => {
      set({ isLoading });
    },

    updateDraftQuiz: (quiz: Partial<Quiz>) => {
      set((state) => ({
        draftQuiz: state.draftQuiz
          ? { ...state.draftQuiz, ...quiz }
          : { ...quiz },
      }));
    },

    fetchQuiz: (quizId: string) => {
      set({ isLoading: true });

      try {
        const activeQuiz = getQuizById(quizId);
        set({ activeQuiz, draftQuiz: { ...activeQuiz } });
      } catch (e) {
        console.error("Failed to load quiz", e);
        set({ activeQuiz: null, draftQuiz: null });
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
