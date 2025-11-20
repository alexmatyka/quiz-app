import { ArrowLeft, CloudLightning } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function QuizNotPublished() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <CloudLightning className="mx-auto h-16 w-16 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-semibold mb-2">Quiz Not Published</h1>

        <p className="text-muted-foreground mb-6">
          Pls publish the quiz before preview it
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
