import type { Metadata } from "next";
import { ViewQuizHeader } from "@/app/quiz/[id]/_components/ViewQuizHeader";
import { QuizBuilder } from "@/app/quiz/edit/_components/quiz-builder/QuizBuilder";

export const metadata: Metadata = {
  title: "Create New Quiz",
  description: "Create a new quiz from scratch.",
};

export default function CreateQuizPage() {
  return (
    <div className="page-container">
      <ViewQuizHeader />
      <main>
        <QuizBuilder />
      </main>
    </div>
  );
}
