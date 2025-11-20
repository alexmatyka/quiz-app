import { quizTableColumns } from "@/app/_home/_utils/quizTableUtils";
import { Table } from "@/components/Table";
import type { Quiz } from "@/lib/types/quiz";

type QuizListProps = {
  quizzes: Quiz[];
};

export const QuizTable = ({ quizzes }: QuizListProps) => {
  return (
    <div className="max-h-[500px] overflow-auto">
      <Table data={quizzes} columns={quizTableColumns} />
    </div>
  );
};
