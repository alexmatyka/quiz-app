import { create } from 'zustand';
import { Quiz } from '@/lib/types/quiz';
import * as quizService from '@/services/quiz.service';

// --- State ---
type QuizState = {
  quizzes: Quiz[];
  isLoading: boolean;
  error: string | null;
};

// --- Actions ---
type QuizActions = {
  fetchQuizzes: () => void;
  // More actions like addQuiz, updateQuiz, deleteQuiz can be added here
};

// --- Store ---
export const useQuizStore = create<QuizState & QuizActions>((set) => ({
  // Initial state
  quizzes: [],
  isLoading: false,
  error: null,

  // Actions implementation
  fetchQuizzes: () => {
    set({ isLoading: true, error: null });
    try {
      const data = quizService.getQuizzes();
      set({ quizzes: data, isLoading: false });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to fetch quizzes';
      set({ isLoading: false, error: errorMessage });
    }
  },
}));
