import { formatDate, formatValue } from "@/utils/posts";
import { type User, type Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import EditableTitle from "./EditableTitle";
import EditableBody from "./EditableBody";

interface PostFullViewProps {
  post: Post;
  user: Pick<User, "id" | "name" | "email" | "image">;
  slug?: string;
}

export default function PostFullView({ post, user, slug }: PostFullViewProps) {
  const formattedDate = formatDate(post.updatedAt);
  const content = formatValue(post.content);
  const isEditable = !slug ? post.ownerId === user.id : false;

  function Title() {
    return slug ? (
      <h3 className="mt-3 text-3xl/8 font-semibold text-gray-900">
        <Link href={`/home/posts/${post.slug}`} className="hover:text-gray-600">
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h3>
    ) : (
      <EditableTitle title={post.title} postId={post.id} />
    );
  }

  function Body() {
    return slug ? (
      <div
        className="mt-5 line-clamp-3 text-lg/6 text-gray-600"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    ) : (
      <EditableBody content={content} postId={post.id} />
    );
  }

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
        <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
          {formattedDate}
        </time>
        <div className="group relative">
          <header>
            <Title />
          </header>
          <Body />
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          {user.image && (
            <Image
              alt=""
              src={user.image}
              className="size-10 rounded-full bg-gray-50"
              width={40}
              height={40}
            />
          )}
          <div className="text-sm/6">
            <p className="font-semibold text-gray-900">
              <a href="#">
                <span className="absolute inset-0" />
                {user.name}
              </a>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
