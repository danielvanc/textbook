"use client";
import { removeBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useAddOptimistic } from "@/hooks/use-addOptimistic";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkCheck, Bookmark } from "lucide-react";
import Form from "next/form";

export default function RemoveBookmark({ bookmarkId }: { bookmarkId: string }) {
  const { state, formAction } = useAddOptimistic(removeBookmark);

  return (
    <Form action={formAction}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="cursor-pointer" variant={"outline"}>
              {state.success ? (
                <Bookmark />
              ) : (
                <BookmarkCheck className="text-orange-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {state.success ? <p>Add bookmark</p> : <p>Remove bookmark</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <input type="hidden" name="bookmarkId" value={bookmarkId} />
    </Form>
  );
}
