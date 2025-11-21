import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HomePageHeader = () => {
  return (
    <header className="flex justify-between items-center mb-2 py-4">
      <h1 className="text-2xl font-bold">
        <Link href="/">Quiz Builder</Link>
      </h1>
      <Button asChild>
        <Link href="/quiz/edit">Create Quiz</Link>
      </Button>
    </header>
  );
};
