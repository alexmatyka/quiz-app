import type { Metadata } from "next";
import { ViewQuizHeader } from "@/app/quiz/[id]/_components/ViewQuizHeader";
import { ViewQuizPageContent } from "@/app/quiz/[id]/_components/ViewQuizPageContent";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `View Quiz ${id}`,
  };
}

export default async function ViewQuizPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="page-container">
      <ViewQuizHeader />
      <main>
        <ViewQuizPageContent quizId={id} />
      </main>
    </div>
  );
}
