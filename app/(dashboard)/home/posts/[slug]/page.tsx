// "use cache";

import { getPost } from "@/utils/db";
import PostFullView from "@/components/posts/PostFullView";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data) notFound();

  const { post, user } = data;

  return <PostFullView post={post} user={user} />;
}
