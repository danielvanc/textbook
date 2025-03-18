import type { Post } from "@prisma/client";
import DeletePost from "./DeletePost";
import { formatDate } from "@/utils/posts";
import { getSessionUserId } from "@/utils/session";

export default async function PostPreHeader({ post }: { post: Post }) {
  const formattedDate = formatDate(post.updatedAt);
  const sessionUser = await getSessionUserId();

  const isOwner = post.ownerId === sessionUser;

  return (
    <div className="flex items-center justify-between">
      <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
        {formattedDate}
      </time>
      {isOwner ? <DeletePost postId={post.id} /> : null}
    </div>
  );
}
