import { verifyUserSession } from "@/utils/session";
import PostForm from "@/components/PostForm";

export default async function NewPost() {
  const { userId } = await verifyUserSession();

  return (
    <div className="max-w-3xl mx-auto py-4 px-2 lg:p-6">
      <h1 className="mb-8">New Post</h1>
      <PostForm userId={userId} />
    </div>
  );
}
