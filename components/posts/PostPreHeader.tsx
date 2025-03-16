import type { Post } from "@prisma/client";
import DeletePost from "./DeletePost";
import { formatDate } from "@/utils/posts";

export default function PostPreHeader({ post }: { post: Post }) {
  const formattedDate = formatDate(post.updatedAt);
  return (
    <div className="flex items-center justify-between mb-4">
      <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
        {formattedDate}
      </time>
      <DeletePost postId={post.id} />
    </div>
  );
}
