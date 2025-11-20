import type { Metadata } from "next";
import { ViewQuizHeader } from "@/app/quiz/[id]/_components/ViewQuizHeader";
import { QuizBuilderEdit } from "@/app/quiz/edit/_components/QuizBuilderEdit";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Edit Quiz ${params.id}`,
    description: `Editing quiz with ID ${params.id}.`,
  };
}

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
