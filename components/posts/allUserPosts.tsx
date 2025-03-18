import { type User, type Post } from "@prisma/client";
import PostPreview from "./PostPreview";

interface AllUserPostsProps {
  posts: Post[];
  user: Pick<User, "id" | "name" | "email" | "image">;
}

export default function AllUserPosts({ posts, user }: AllUserPostsProps) {
  if (!posts || posts.length === 0) {
    return <p>Looks like you haven&apos;t made any posts yet</p>;
  }

  return posts.map((post) => {
    const mergedUserAndPost = {
      ...post,
      owner: {
        ...user,
      },
    };
    return <PostPreview key={post.id} post={mergedUserAndPost} />;
  });
}
