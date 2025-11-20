import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `View Quiz ${params.id}`,
  };
}

export default function ViewQuizPage({ params }: Props) {
  return (
    <div>
      <h1>Viewing Quiz: {params.id}</h1>
      {/* ViewQuizPage */}
    </div>
  );
}
