import { formatDate } from "@/utils/posts";
import { type User, type Post } from "@prisma/client";
import Link from "next/link";
import PostFooter from "./PostFooter";

interface PostPreviewProps {
  post: Post;
  user: Pick<User, "id" | "name" | "email" | "image">;
  slug?: string;
}

export default function PostPreview({ post, user }: PostPreviewProps) {
  const formattedDate = formatDate(post.updatedAt);

  return (
    <div className="container">
      <article
        key={post.id}
        className="[&:not(:last-child)]:border-b-1 border-gray-200"
      >
        <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
          {formattedDate}
        </time>
        <div className="group relative">
          <header>
            <h3 className="mt-3 text-3xl/8 font-semibold text-gray-900">
              <Link
                href={`/home/posts/${post.slug}`}
                className="hover:text-gray-600"
              >
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
          </header>
          <textarea
            className="mt-5 line-clamp-3 text-lg/6 text-black w-full"
            readOnly
            draggable={false}
            value={post.description}
          />
        </div>
        <PostFooter user={user} />
      </article>
    </div>
  );
}
