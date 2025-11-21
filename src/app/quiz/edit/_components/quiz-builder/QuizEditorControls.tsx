import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { publishQuiz, saveQuiz, unpublishQuiz } from "@/services/quiz.service";
import { useQuizStore } from "@/stores/quiz.store";

export const QuizEditorControls = () => {
  const router = useRouter();

  const draftQuiz = useQuizStore((s) => s.draftQuiz);
  const updateRefetchTrigger = useQuizStore((s) => s.updateRefetchTrigger);

  // It's better to use server action here, but we work with local storage
  const onSaveQuiz = () => {
    if (!draftQuiz) return;

    const savedQuiz = saveQuiz(draftQuiz);

    if (draftQuiz?.id) {
      updateRefetchTrigger();
    } else {
      router.push(`/${savedQuiz?.id}`);
    }
  };

  const isPublished = draftQuiz?.published === true;

  const managePublishState = () => {
    if (!draftQuiz?.id) return;

    if (isPublished) {
      unpublishQuiz(draftQuiz.id);
    } else {
      publishQuiz(draftQuiz.id);
    }

    // Re-fetch saved item from server and sync it with draft
    updateRefetchTrigger();
  };

  return (
    <>
      <Button variant="success" onClick={onSaveQuiz}>
        Save
      </Button>

      {draftQuiz?.id && (
        <Button variant="info" onClick={managePublishState}>
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      )}
    </>
  );
};
