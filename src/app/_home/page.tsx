import type { Metadata } from "next";
import { HomePageHeader } from "@/app/_home/_components/HomePageHeader";

export const metadata: Metadata = {
  title: "All Quizzes",
  description: "View all available quizzes.",
};

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        <HomePageHeader />
      </div>

      <div className="w-full max-w-[1400px] mt-6"></div>
    </div>
  );
}
