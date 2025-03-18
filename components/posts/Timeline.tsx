import type { Post, User } from "@prisma/client";
import PostPreview from "./PostPreview";

interface TimelineProps {
  posts: (Post & {
    owner: Pick<User, "id" | "name" | "email" | "image">;
  })[];
}

export default function Timeline({ posts }: TimelineProps) {
  if (!posts || posts.length === 0) {
    return <p>Looks like no posts have been made yet</p>;
  }

  return posts.map((post) => <PostPreview key={post.id} post={post} />);
}
