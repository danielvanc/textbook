"use client";
import { removeBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Bookmark } from "lucide-react";
import Form from "next/form";
import { useOptimistic, useState } from "react";
import { toast } from "sonner";

const initialState = {
  message: "",
  success: false,
  error: false,
};

export default function RemoveBookmark({ bookmarkId }: { bookmarkId: string }) {
  const [bookmarkState, setBookmarkState] = useState(initialState);
  const [state, setOptimisticState] = useOptimistic(bookmarkState);

  async function formAction(formData: FormData) {
    setOptimisticState({ ...bookmarkState, success: true });
    const result = await removeBookmark(formData);

    setBookmarkState(result);

    if (result.error) toast.error(result.message);
  }

  return (
    <Form action={formAction}>
      <Button className="cursor-pointer" variant={"outline"}>
        {state.success ? (
          <Bookmark />
        ) : (
          <BookmarkCheck className="text-orange-500" />
        )}
      </Button>
      <input type="hidden" name="bookmarkId" value={bookmarkId} />
    </Form>
  );
}
