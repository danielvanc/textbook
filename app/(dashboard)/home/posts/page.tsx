import AllUserPosts from "@/components/posts/allUserPosts";
import { getUsersPosts } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import type React from "react";

export default async function MyPostsPage() {
  const { userId } = await verifyUserSession();
  const { user, posts } = await getUsersPosts(userId);

  return (
    <div className="container">
      <AllUserPosts user={user} posts={posts} />
    </div>
  );
}
