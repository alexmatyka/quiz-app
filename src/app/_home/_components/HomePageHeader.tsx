import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HomePageHeader = () => {
  return (
    <header className="flex justify-between items-center mb-6 py-10">
      <h1 className="text-2xl font-bold">Quiz Builder</h1>
      <Button asChild>
        <Link href="/quiz/edit">Create Quiz</Link>
      </Button>
    </header>
  );
};
