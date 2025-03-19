"use client";
import { removeBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useAddOptimistic } from "@/hooks/use-addOptimistic";
import { BookmarkCheck, Bookmark } from "lucide-react";
import Form from "next/form";

export default function RemoveBookmark({ bookmarkId }: { bookmarkId: string }) {
  const { state, formAction } = useAddOptimistic(removeBookmark);

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
