import { sortPostsByDateDesc } from "@/utils/posts";
import { type User, type Post } from "@prisma/client";
import PostPreview from "./PostPreview";

interface AllUserPostsProps {
  posts: Post[];
  user: Pick<User, "id" | "name" | "email" | "image">;
}

export default function AllUserPosts({ user, posts }: AllUserPostsProps) {
  if (!posts || posts.length === 0) {
    return <p>Looks like you haven&apos;t made any posts yet</p>;
  }

  return sortPostsByDateDesc(posts).map((post) => (
    <PostPreview key={post.id} post={post} user={user} />
  ));
}
