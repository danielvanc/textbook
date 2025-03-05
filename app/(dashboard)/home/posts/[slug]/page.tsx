import { getPost } from "@/utils/db";
import PostFullView from "@/components/posts/PostFullView";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { post, user } = await getPost(slug);

  return <PostFullView post={post} user={user} />;
}
