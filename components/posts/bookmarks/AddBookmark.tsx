"use client";

import { addBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useAddOptimistic } from "@/hooks/use-addOptimistic";
import { Bookmark, BookmarkPlus } from "lucide-react";
import Form from "next/form";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookmarkPostType {
  userId: string;
  postId: string;
}

export default function AddBookmark({ userId, postId }: BookmarkPostType) {
  const { state, formAction } = useAddOptimistic(addBookmark);

  return (
    <Form action={formAction}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="cursor-pointer" variant={"outline"}>
              {state.success ? (
                <>
                  <BookmarkPlus className="text-orange-500" />
                </>
              ) : (
                <Bookmark />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {state.success ? <p>Remove bookmark</p> : <p>Add bookmark</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="postId" value={postId} />
    </Form>
  );
}
