import type { Bookmark, Post } from "@prisma/client";
import DeletePost from "./DeletePost";
import { formatDate, postIsBookmarkedByUser } from "@/utils/posts";
import { getSessionUserId } from "@/utils/session";
import AddBookmark from "./bookmarks/AddBookmark";
import RemoveBookmark from "./bookmarks/RemoveBookmark";

export default async function PostPreHeader({
  post,
}: {
  post: Post & { bookmarks: Pick<Bookmark, "userId" | "id">[] };
}) {
  const formattedDate = formatDate(post.updatedAt);
  const sessionUser = (await getSessionUserId()) as string;

  const isOwner = post.ownerId === sessionUser;

  const { isBookmarked, bookmarkId } = postIsBookmarkedByUser(
    post.bookmarks,
    sessionUser
  );

  return (
    <div className="flex items-center justify-between">
      <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
        {formattedDate}
      </time>
      <div>
        {!isOwner && isBookmarked && (
          <RemoveBookmark bookmarkId={bookmarkId as string} />
        )}
        {!isOwner && !isBookmarked && (
          <AddBookmark postId={post.id} userId={sessionUser} />
        )}
        {isOwner && <DeletePost postId={post.id} />}
      </div>
    </div>
  );
}
