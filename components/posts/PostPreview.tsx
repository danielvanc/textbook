import Link from "next/link";
import PostFooter from "./PostFooter";

export default function PostPreview({ post, children }: PostPreviewProps) {
  const user = {
    id: post.ownerId,
    name: post.owner.name,
    email: post.owner.email,
    image: post.owner.image,
  };

  return (
    <article
      key={post.id}
      className="[&:not(:last-child)]:border-b-1 border-gray-200 [&:not(:last-child)]:mb-8"
    >
      {children}
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
  );
}
