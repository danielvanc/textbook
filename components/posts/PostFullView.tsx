import { formatDate } from "@/utils/posts";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { type User, type Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PostFullViewProps {
  post: Omit<Post, "ownerId">;
  user: Pick<User, "id" | "name" | "email" | "image">;
  slug?: string;
}

export default function PostFullView({ post, user, slug }: PostFullViewProps) {
  const formattedDate = formatDate(post.updatedAt);
  const content = generateHTML(JSON.parse(post.content), [StarterKit]);

  function Title({ slug }: { slug: PostFullViewProps["slug"] }) {
    return (
      <h3 className="mt-3 text-3xl/8 font-semibold text-gray-900">
        {slug ? (
          <Link
            href={`/home/posts/${post.slug}`}
            className="hover:text-gray-600"
          >
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        ) : (
          post.title
        )}
      </h3>
    );
  }

  return (
    <article
      key={post.id}
      className="[&:not(:last-child)]:border-b-1 border-gray-200 py-10 px-4 xl:mr-5"
    >
      <time dateTime={formattedDate} className="text-gray-500 italic text-xs">
        {formattedDate}
      </time>
      <div className="group relative">
        <Title slug={slug} />
        <div
          className="mt-5 line-clamp-3 text-lg/6 text-gray-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
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
          {/* TODO: update when introduce RBAC */}
          {/* <p className="text-gray-600">Admin</p> */}
        </div>
      </div>
    </article>
  );
}
