"use client";

import { bookmarkPost } from "@/app/actions";
import Spinner from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface BookmarkPostType {
  userId: string;
  postId: string;
}

const initialState = {
  id: "",
  message: "",
  error: false,
};

export default function AddBookmark({ userId, postId }: BookmarkPostType) {
  const [state, formAction, pending] = useActionState(
    (
      state: { id: string; message: string; error: boolean },
      formData: FormData
    ) => bookmarkPost(formData),
    initialState
  );

  useEffect(() => {
    if (state.id) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <Form action={formAction}>
      <Button disabled={pending} className="cursor-pointer" variant={"outline"}>
        {pending ? (
          <>
            <Spinner />
            Bookmarking...
          </>
        ) : (
          <Bookmark />
        )}
      </Button>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="postId" value={postId} />
      {state.error && <p className="error-message">{state.message}</p>}
    </Form>
  );
}
