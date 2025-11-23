import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Quiz } from "@/lib/types/quiz";
import { getQuizById } from "@/services/quiz.service";

interface QuizStore {
  // The saved quiz (source of truth)
  originalQuiz: Quiz | null;
  // Editable copy for making changes, can reset to activeQuiz if needed
  draftQuiz: Partial<Quiz> | null;
  isLoading: boolean;
  refetchTrigger: number;
  fetchQuiz: (quizId: string) => void;
  updateDraftQuiz: (quiz: Partial<Quiz>) => void;
  updateRefetchTrigger: () => void;
  resetQuizStore: () => void;
}

const INITIAL_QUIZ_DATA = { title: "", blocks: [] };

export const useQuizStore = create<QuizStore>()(
  devtools((set) => ({
    originalQuiz: INITIAL_QUIZ_DATA,
    draftQuiz: INITIAL_QUIZ_DATA,
    isLoading: true,
    refetchTrigger: 0,

    resetQuizStore: () => {
      set({
        originalQuiz: null,
        draftQuiz: null,
        isLoading: true,
        refetchTrigger: 0,
      });
    },

    updateRefetchTrigger: () => {
      set((state) => ({
        refetchTrigger: state.refetchTrigger + 1,
      }));
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
        // This is supposed to be an SSR request, but since we use localStorage, we handle it on the client side in a Zustand action
        const originalQuiz = getQuizById(quizId);

        set({ originalQuiz, draftQuiz: { ...originalQuiz } });
      } catch {
        set({ originalQuiz: null, draftQuiz: null });
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
