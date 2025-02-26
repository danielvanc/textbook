import AllUserPosts from "@/components/posts/allUserPosts";
import TwoColumn from "@/components/two-column";
import { getUsersPosts } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import type React from "react";

export default async function Page() {
  const { user, userId } = await verifyUserSession();
  const { posts } = await getUsersPosts(userId);

  return (
    <div className="flex justify-between gap-4 p-4 min-h-[calc(100vh-4rem)]">
      <TwoColumn user={user}>
        <AllUserPosts posts={posts} user={user} />
      </TwoColumn>
    </div>
  );
}
