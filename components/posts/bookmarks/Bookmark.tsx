import { formatDate } from "@/utils/posts";
import type { Post, User } from "@prisma/client";
import Link from "next/link";

type BookmarkProps = Pick<Post, "id" | "updatedAt" | "title" | "slug"> & {
  owner: Pick<User, "id" | "name" | "username">;
};

export default function Bookmark({ post }: { post: BookmarkProps }) {
  const formattedDate = formatDate(post.updatedAt);

  return (
    <article className="">
      <header>
        <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
          {formattedDate}
        </time>
      </header>
      <div>
        <h3>
          <Link href={`/home/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-right">
          <small>
            By{" "}
            <Link href={`/home/${post.owner.username}`}>{post.owner.name}</Link>
          </small>
        </p>
      </div>
    </article>
  );
}
