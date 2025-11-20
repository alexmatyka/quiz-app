import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { QuizNotPublished } from "@/app/quiz/[id]/_components/QuizNotPublished";
import { Spinner } from "@/components/ui/spinner";
import type { Quiz } from "@/lib/types/quiz";

type QuizStatusWrapperProps = {
  quiz: Quiz | null;
  isLoading: boolean;
  children: React.ReactNode;
};

export const QuizStatusWrapper = ({
  quiz,
  isLoading,
  children,
}: QuizStatusWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !quiz) {
      router.replace(`${pathname}/404`);
    }
  }, [pathname, isLoading, quiz, router.replace]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-full" aria-live="polite">
        <span className="sr-only">Loading...</span>
        <Spinner className="border-secondary-foreground h-8 w-8" />
      </div>
    );
  }

  if (!quiz) return null;
  if (!quiz.published) return <QuizNotPublished />;

  return <>{children}</>;
};
