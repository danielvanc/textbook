import AllUserPosts from "@/components/posts/allUserPosts";
import { getUsersPosts } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import type React from "react";

export default async function Page() {
  const { user, userId } = await verifyUserSession();
  const { posts } = await getUsersPosts(userId);

  return <AllUserPosts posts={posts} user={user} />;
}
