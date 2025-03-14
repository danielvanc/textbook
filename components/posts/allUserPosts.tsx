import { sortPostsByDateDesc } from "@/utils/posts";
import { type User, type Post } from "@prisma/client";
import PostPreview from "./PostPreview";

interface AllUserPostsProps {
  posts: Post[];
  user: Pick<User, "id" | "name" | "email" | "image">;
}

export default function AllUserPosts({ user, posts }: AllUserPostsProps) {
  return sortPostsByDateDesc(posts).map((post) => (
    <PostPreview key={post.id} post={post} user={user} />
  ));
}
