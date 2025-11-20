import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Quiz } from "@/lib/types/quiz";
import { formatDateForUI } from "@/lib/utils/date";

export const quizTableColumns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "updatedAt",
    label: "Updated",
    render: (q: Quiz) => formatDateForUI(q.updatedAt),
  },
  {
    key: "actions",
    label: "",
    className: "text-right",
    render: (q: Quiz) => (
      <div className="flex justify-end gap-2">
        <Link href={`/quiz/edit/${q.id}`}>
          <Button size="sm" variant="ghost" className="cursor-pointer">
            Edit
          </Button>
        </Link>
        <Link href={`/quiz/${q.id}`}>
          <Button size="sm" variant="outline" className="cursor-pointer">
            View
          </Button>
        </Link>
      </div>
    ),
  },
];
