import type { Metadata } from "next";
import { HomePageContent } from "./_home/_components/HomePageContent";
import { HomePageHeader } from "./_home/_components/HomePageHeader";

export const metadata: Metadata = {
  title: "All Quizzes",
  description: "View, create, and manage all your quizzes.",
};

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-[1200px] px-4">
      <HomePageHeader />
      <main>
        <HomePageContent />
      </main>
    </div>
  );
}
