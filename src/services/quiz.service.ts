import toast from "react-hot-toast";
import { BlockType, QuestionType, type Quiz } from "@/lib/types/quiz";
import { createTimestamp } from "@/lib/utils/date";
import { getFromStorage, setToStorage } from "@/lib/utils/local-storage";

const INDEX_KEY = "quizbuilder.index";
const QUIZ_KEY_PREFIX = "quizbuilder.quiz.";
const INITIALIZED_KEY = "quizbuilder.initialized";

const getQuizKey = (id: string) => `${QUIZ_KEY_PREFIX}${id}`;

export const getQuizzes = (): Quiz[] => {
  if (typeof window === "undefined") return [];

  const quizIds = getFromStorage<string[]>(INDEX_KEY, []);
  return quizIds
    .map((id) => getFromStorage<Quiz | null>(getQuizKey(id), null))
    .filter(Boolean) as Quiz[];
};

export const getQuizById = (id: string): Quiz | undefined => {
  if (typeof window === "undefined") return undefined;

  return getFromStorage<Quiz | undefined>(getQuizKey(id), undefined);
};

export const removeQuiz = (id: string): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(getQuizKey(id));

  const quizIds = getFromStorage<string[]>(INDEX_KEY, []);

  const newQuizIds = quizIds.filter((quizId) => quizId !== id);

  localStorage.setItem(INDEX_KEY, JSON.stringify(newQuizIds));

  toast.success("Quiz removed");
};

export const saveQuiz = (quizData: Partial<Quiz>): Quiz | null => {
  if (typeof window === "undefined") return null;

  if (!quizData.title || !quizData.blocks) {
    toast.error("title and droppable-area-blocks are required fields");
    throw new Error("title and droppable-area-blocks are required fields");
  }

  const now = createTimestamp();

  if (quizData.id) {
    // Update existing quiz
    const existingQuiz = getQuizById(quizData.id);
    if (!existingQuiz) return null;

    const updatedQuiz: Quiz = { ...existingQuiz, ...quizData, updatedAt: now };
    setToStorage(getQuizKey(updatedQuiz.id), updatedQuiz);

    toast.success("Quiz updated");
    return updatedQuiz;
  } else {
    // Create new quiz
    const newQuiz = {
      blocks: quizData.blocks || [],
      id: crypto.randomUUID(),
      published: false,
      title: quizData.title || "",
      createdAt: now,
      updatedAt: now,
    };

    setToStorage(getQuizKey(newQuiz.id), newQuiz);

    const quizIds = getFromStorage(INDEX_KEY, []);
    setToStorage(INDEX_KEY, [...quizIds, newQuiz.id]);

    toast.success("Quiz created");
    return newQuiz;
  }
};

export const publishQuiz = (id: string): Quiz | null => {
  const quizToPublish = getQuizById(id);
  if (!quizToPublish) {
    toast.error("Pls provide quiz for publish");
    return null;
  }

  const publishedQuiz: Quiz = {
    ...quizToPublish,
    published: true,
    updatedAt: createTimestamp(),
  };

  setToStorage(getQuizKey(id), publishedQuiz);

  toast.success("Quiz published");
  return publishedQuiz;
};

export const unpublishQuiz = (id: string): Quiz | null => {
  const quizToUnPublish = getQuizById(id);
  if (!quizToUnPublish) {
    toast.error("Pls provide quiz for unpublish");
    return null;
  }

  const publishedQuiz: Quiz = {
    ...quizToUnPublish,
    published: false,
    updatedAt: createTimestamp(),
  };

  setToStorage(getQuizKey(id), publishedQuiz);

  toast.success("Quiz unpublished");
  return publishedQuiz;
};

export const seedInitialData = () => {
  if (typeof window === "undefined" || getFromStorage(INITIALIZED_KEY, false)) {
    return;
  }

  const now = createTimestamp();
  const seedQuizzes: Quiz[] = [
    {
      id: crypto.randomUUID(),
      title: "Sample Science Quiz",
      blocks: [
        {
          id: crypto.randomUUID(),
          type: BlockType.Heading,
          content: { text: "A Quick Quiz on Planets", variant: "h1" },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            text: "Which planet is known as the Red Planet?",
            questionType: QuestionType.Single,
            options: [
              { id: "Earth", value: "Earth" },
              { id: "Mars", value: "Mars" },
            ],
          },
        },
      ],
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "My Draft Quiz",
      blocks: [],
      published: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Frontend Technologies ( MANDATORY )",
      blocks: [
        {
          id: crypto.randomUUID(),
          type: BlockType.Heading,
          content: { text: "Test Your Frontend Knowledge", variant: "h2" },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            text: "What does CSS stand for?",
            questionType: QuestionType.Text,
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            text: "Which of these are JavaScript frameworks?",
            questionType: QuestionType.Multi,
            options: [
              { id: "React", value: "React" },
              { id: "Vue", value: "Vue" },
              { id: "Angular", value: "Angular" },
              { id: "Svelte", value: "Svelte" },
            ],
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            text: "Is JSX required to use React?",
            questionType: QuestionType.Single,
            options: [
              { id: "Yes", value: "Yes" },
              { id: "No", value: "No" },
              { id: "122323dsd", value: "No JSX in React!" },
              { id: "122323ddsd", value: "I am Jquery developer!" },
            ],
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            text: "Select react frameworks",
            questionType: QuestionType.Multi,
            options: [
              { id: "nextjs", value: "NextJS" },
              { id: "remix", value: "Remix" },
              { id: "Gatsby", value: "Gatsby" },
              { id: "tanstack", value: "TanStack Start" },
              { id: "expo", value: "Expo" },
            ],
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Button,
          content: {
            text: "Submit",
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Footer,
          content: {
            text: "Annual quiz of all developers",
          },
        },
      ],
      published: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const quizIds = seedQuizzes.map((q) => q.id);
  setToStorage(INDEX_KEY, quizIds);

  seedQuizzes.forEach((quiz) => {
    setToStorage(getQuizKey(quiz.id), quiz);
  });

  setToStorage(INITIALIZED_KEY, true);
};
