"use cache";

import { getPost } from "@/utils/db";
import PostFullView from "@/components/posts/PostFullView";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { post, user } = await getPost(slug);

  return <PostFullView post={post} user={user} />;
}
