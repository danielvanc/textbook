"use client";
import { deletePost } from "@/app/actions";
import Form from "next/form";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";
import Spinner from "../icons/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={pending}
              className="cursor-pointer"
              variant={"outline"}
            >
              {pending ? (
                <>
                  <Spinner />
                  Deleting post...
                </>
              ) : (
                <Trash2Icon className="text-red-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <input type="hidden" name="postId" value={postId} />
    </Form>
  );
}
