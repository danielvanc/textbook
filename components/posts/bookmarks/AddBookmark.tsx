"use client";

import { addBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useAddOptimistic } from "@/hooks/use-addOptimistic";
import { Bookmark, BookmarkPlus } from "lucide-react";
import Form from "next/form";

interface BookmarkPostType {
  userId: string;
  postId: string;
}

export default function AddBookmark({ userId, postId }: BookmarkPostType) {
  const { state, formAction } = useAddOptimistic(addBookmark);

  return (
    <Form action={formAction}>
      <Button className="cursor-pointer" variant={"outline"}>
        {state.success ? (
          <BookmarkPlus className="text-orange-500" />
        ) : (
          <Bookmark />
        )}
      </Button>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="postId" value={postId} />
    </Form>
  );
}
