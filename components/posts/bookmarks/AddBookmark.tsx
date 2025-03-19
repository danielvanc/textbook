"use client";

import { bookmarkPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkPlus } from "lucide-react";
import Form from "next/form";
import { useOptimistic, useState } from "react";
import { toast } from "sonner";

interface BookmarkPostType {
  userId: string;
  postId: string;
}

const initialState = {
  message: "",
  success: false,
  error: false,
};

export default function AddBookmark({ userId, postId }: BookmarkPostType) {
  const [bookmarkState, setBookmarkState] = useState(initialState);
  const [state, setOptimisticState] = useOptimistic(bookmarkState);

  async function formAction(formData: FormData) {
    setOptimisticState({ ...bookmarkState, success: true });
    const result = await bookmarkPost(formData);

    setBookmarkState(result);

    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  }

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
