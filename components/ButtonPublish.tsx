"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function ButtonPublish() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-[120px] cursor-pointer" disabled={pending}>
      {pending ? "Publishing..." : "Publish"}
    </Button>
  );
}
