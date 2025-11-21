import { BlockType, QuestionType, type Quiz } from "@/lib/types/quiz";
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

export const saveQuiz = (quizData: Partial<Quiz>): Quiz | null => {
  if (typeof window === "undefined") return null;

  if (!quizData.title || !quizData.blocks) {
    throw new Error("title and blocks are required fields");
  }

  const now = new Date().toISOString();

  if (quizData.id) {
    // Update existing quiz
    const existingQuiz = getQuizById(quizData.id);
    if (!existingQuiz) return null;

    const updatedQuiz: Quiz = { ...existingQuiz, ...quizData, updatedAt: now };
    setToStorage(getQuizKey(updatedQuiz.id), updatedQuiz);
    return updatedQuiz;
  } else {
    // Create new quiz
    const newQuiz = {
      id: crypto.randomUUID(),
      published: false,
      ...quizData,
      createdAt: now,
      updatedAt: now,
    } as Quiz;

    setToStorage(getQuizKey(newQuiz.id), newQuiz);

    const quizIds = getFromStorage<string[]>(INDEX_KEY, []);
    setToStorage(INDEX_KEY, [...quizIds, newQuiz.id]);

    return newQuiz;
  }
};

export const publishQuiz = (id: string): Quiz | null => {
  const quizToPublish = getQuizById(id);
  if (!quizToPublish) return null;

  const publishedQuiz: Quiz = {
    ...quizToPublish,
    published: true,
    updatedAt: new Date().toISOString(),
  };

  setToStorage(getQuizKey(id), publishedQuiz);
  return publishedQuiz;
};

export const unpublishQuiz = (id: string): Quiz | null => {
  const quizToPublish = getQuizById(id);
  if (!quizToPublish) return null;

  const publishedQuiz: Quiz = {
    ...quizToPublish,
    published: false,
    updatedAt: new Date().toISOString(),
  };

  setToStorage(getQuizKey(id), publishedQuiz);
  return publishedQuiz;
};

export const seedInitialData = () => {
  if (typeof window === "undefined" || getFromStorage(INITIALIZED_KEY, false)) {
    return;
  }

  const now = new Date().toISOString();
  const seedQuizzes: Quiz[] = [
    {
      id: crypto.randomUUID(),
      title: "Sample Science Quiz",
      blocks: [
        {
          id: crypto.randomUUID(),
          type: BlockType.Heading,
          content: { text: "A Quick Quiz on Planets" },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            questionText: "Which planet is known as the Red Planet?",
            questionType: QuestionType.Single,
            options: ["Earth", "Mars", "Jupiter", "Venus"],
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
      title: "Frontend Technologies",
      blocks: [
        {
          id: crypto.randomUUID(),
          type: BlockType.Heading,
          content: { text: "Test Your Frontend Knowledge" },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            questionText: "What does CSS stand for?",
            questionType: QuestionType.Text,
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            questionText: "Which of these are JavaScript frameworks?",
            questionType: QuestionType.Multi,
            options: ["React", "Angular", "Django", "Vue"],
          },
        },
        {
          id: crypto.randomUUID(),
          type: BlockType.Question,
          content: {
            questionText: "Is JSX required to use React?",
            questionType: QuestionType.Single,
            options: ["Yes", "No"],
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
