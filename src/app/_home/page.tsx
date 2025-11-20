import type { Metadata } from "next";
import { HomePageContent } from "@/app/_home/_components/HomePageContent";
import { HomePageHeader } from "@/app/_home/_components/HomePageHeader";

export const metadata: Metadata = {
  title: "All Quizzes",
  description: "View, create, and manage all your quizzes.",
};

export default function HomePage() {
  return (
    <div className="page-container">
      <HomePageHeader />
      <main>
        <HomePageContent />
      </main>
    </div>
  );
}
