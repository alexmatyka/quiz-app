import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import type { ButtonBlock } from "@/lib/types/quiz";

type ButtonBlockComponentProps = {
  block: ButtonBlock;
};

export const ButtonBlockComponent = ({ block }: ButtonBlockComponentProps) => {
  const router = useRouter();
  // It can be configured based on the block's configuration; this could include various actions or redirects,
  // but in our case, everything is simplified to just an alert and a redirect.
  const buttonAction = () => {
    toast.success(
      "Thank you for your time. The quiz data has been submitted for review, and we will get in touch with you soon.",
      { duration: 5000 },
    );

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="flex justify-end py-4 text-gray-600">
      <Button
        size="lg"
        variant="success"
        className="min-w-50"
        onClick={buttonAction}
      >
        {block.content.text}
      </Button>
    </div>
  );
};
