import Timeline from "@/components/posts/Timeline";
import { getTimelinePosts } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import type React from "react";

export default async function Page() {
  await verifyUserSession();
  const posts = await getTimelinePosts();

  return <Timeline posts={posts} />;
}
