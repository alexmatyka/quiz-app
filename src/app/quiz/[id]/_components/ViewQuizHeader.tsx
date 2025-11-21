import Link from "next/link";

export const ViewQuizHeader = () => {
  return (
    <header className="flex mb-2 py-4">
      <h1 className="text-2xl font-bold">
        <Link href="/">Quiz Builder</Link>
      </h1>
    </header>
  );
};
