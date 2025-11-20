import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Edit Quiz ${params.id}`,
    description: `Editing quiz with ID ${params.id}.`,
  };
}

export default function EditQuizPage({ params }: Props) {
  return (
    <div>
      <h1>Editing Quiz: {params.id}</h1>
      {/* EditQuizPage */}
    </div>
  );
}
