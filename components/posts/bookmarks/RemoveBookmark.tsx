import { Button } from "@/components/ui/button";
import { BookmarkCheck } from "lucide-react";

export default function RemoveBookmark() {
  return (
    <Button variant={"outline"} className="cursor-pointer">
      <BookmarkCheck className="text-orange-500" />
    </Button>
  );
}
