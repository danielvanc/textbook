import PostPreHeader from "./PostPreHeader";
import PostPreview from "./PostPreview";

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
    return (
      <PostPreview key={post.id} post={mergedUserAndPost}>
        <PostPreHeader post={post} />
      </PostPreview>
    );
  });
}
