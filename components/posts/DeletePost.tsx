"use client";
import { deletePost } from "@/app/actions";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const initialState = {
  message: "",
  error: false,
};

export default function DeletePost({ postId }: { postId: string }) {
  const [state, formAction, pending] = useActionState(
    (state: { message: string; error: boolean }, formData: FormData) =>
      deletePost(formData),
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast.error(<p className="text-red-500">{state.message}</p>);
    }
  }, [state.message]);

  return (
    <Form action={formAction}>
      <Button disabled={pending} className="cursor-pointer" variant={"outline"}>
        {pending ? (
          <>
            <span className="loading-spinner" /> Deleting post...
          </>
        ) : (
          "Delete Post"
        )}
      </Button>
      <input type="hidden" name="postId" value={postId} />
    </Form>
  );
}
