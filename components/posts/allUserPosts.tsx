import { sortPostsByDateDesc } from "@/utils/posts";
import PostFullView from "./PostFullView";
import { type User, type Post } from "@prisma/client";

interface AllUserPostsProps {
  posts: Post[];
  user: Pick<User, "id" | "name" | "email" | "image">;
}

export default function AllUserPosts({ user, posts }: AllUserPostsProps) {
  // TODO: Update to use PostShortView component
  return sortPostsByDateDesc(posts).map((post) => (
    <PostFullView
      key={post.id}
      post={post}
      user={user}
      slug={post.slug as string}
    />
  ));
}
