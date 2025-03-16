import { formatDate, formatValue } from "@/utils/posts";
import { type User, type Post } from "@prisma/client";
import EditableTitle from "./EditableTitle";
import EditableBody from "./EditableBody";
import EditableDescription from "./EditableDescription";
import PostFooter from "./PostFooter";
import DeletePost from "./DeletePost";

interface PostFullProps {
  post: Post;
  user: Pick<User, "id" | "name" | "email" | "image">;
  slug?: string;
}

export default function PostFullView({ post, user, slug }: PostFullProps) {
  const formattedDate = formatDate(post.updatedAt);
  const content = formatValue(post.content);
  const isEditable = !slug ? post.ownerId === user.id : false;

  return (
    <div className="container">
      {isEditable && (
        <p className="text-right text-sm/6 mb-4 text-gray-500">
          <small>TIP: To edit, click into each field.</small>
        </p>
      )}
      <article
        key={post.id}
        className="[&:not(:last-child)]:border-b-1 border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <time
            dateTime={formattedDate}
            className="text-gray-500 italic text-xs"
          >
            {formattedDate}
          </time>
          <DeletePost postId={post.id} />
        </div>
        <div className="group relative">
          <header>
            <EditableTitle title={post.title} postId={post.id} />
          </header>
          <EditableDescription content={post.description} postId={post.id} />
          <EditableBody content={content} postId={post.id} />
        </div>
        <PostFooter user={user} />
      </article>
    </div>
  );
}
