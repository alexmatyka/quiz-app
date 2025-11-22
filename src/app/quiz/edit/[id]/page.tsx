"use server";

import type { Metadata } from "next";
import { ViewQuizHeader } from "@/app/quiz/[id]/_components/ViewQuizHeader";
import { QuizBuilderEdit } from "@/features/quiz-builder/wrappers/QuizBuilderEdit";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Edit Quiz ${id}`,
    description: `Editing quiz with ID ${id}.`,
  };
}

// We should place ssr request for quiz in real app here
export default async function EditQuizPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="page-container">
      <ViewQuizHeader />
      <main>
        <QuizBuilderEdit quizId={id} />
      </main>
    </div>
  );
}
