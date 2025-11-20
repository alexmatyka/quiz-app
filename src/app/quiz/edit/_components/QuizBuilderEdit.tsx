import { QuizBuilder } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilder";

type QuizBuilderEditProps = {
  quizId: string;
};

export const QuizBuilderEdit = ({ quizId }: QuizBuilderEditProps) => {
  return <QuizBuilder />;
};
