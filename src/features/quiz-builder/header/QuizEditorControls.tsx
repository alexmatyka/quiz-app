import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { publishQuiz, saveQuiz, unpublishQuiz } from "@/services/quiz.service";
import { useQuizStore } from "@/stores/quiz.store";

export const QuizEditorControls = () => {
  const router = useRouter();

  const originalQuiz = useQuizStore((s) => s.originalQuiz);
  const draftQuiz = useQuizStore((s) => s.draftQuiz);
  const updateRefetchTrigger = useQuizStore((s) => s.updateRefetchTrigger);

  // It's better to use server action here, but we work with local storage
  const onSaveQuiz = () => {
    if (!draftQuiz) return;

    const savedQuiz = saveQuiz(draftQuiz);

    if (draftQuiz?.id) {
      updateRefetchTrigger();
    } else {
      router.push(`/quiz/edit/${savedQuiz?.id}`);
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

  // Enough for this test task, but to be on safe side using this we have to use more advanced structure for droppable-area-blocks instead of common array,
  // or it can be re-ordered somehow and this check will be true
  const isSaveButtonDisabled =
    JSON.stringify(originalQuiz) === JSON.stringify(draftQuiz);

  return (
    <>
      <Button
        variant="success"
        onClick={onSaveQuiz}
        className="min-w-25"
        disabled={isSaveButtonDisabled}
      >
        Save
      </Button>

      {draftQuiz?.id && (
        <Button
          variant="info"
          onClick={managePublishState}
          className="min-w-25"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      )}
    </>
  );
};
