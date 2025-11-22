import { quizTableColumns } from "@/app/_home/utils/quizTableConfig";
import { Table } from "@/components/Table";
import type { Quiz } from "@/lib/types/quiz";
import { removeQuiz } from "@/services/quiz.service";
import { useQuizzesStore } from "@/stores/quizzes.store";

type QuizListProps = {
  quizzes: Quiz[];
};

export const QuizTable = ({ quizzes }: QuizListProps) => {
  const updateRefetchTrigger = useQuizzesStore((s) => s.updateRefetchTrigger);

  const removeQuizCallback = (quizId: string) => {
    removeQuiz(quizId);
    updateRefetchTrigger();
  };

  const columns = quizTableColumns(removeQuizCallback);

  return (
    <div className="max-h-[500px] overflow-auto">
      <Table data={quizzes} columns={columns} />
    </div>
  );
};
