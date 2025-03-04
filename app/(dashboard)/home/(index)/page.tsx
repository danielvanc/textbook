import { verifyUserSession } from "@/utils/session";
import type React from "react";

export default async function Page() {
  await verifyUserSession();

  return <p>Feed</p>;
}
