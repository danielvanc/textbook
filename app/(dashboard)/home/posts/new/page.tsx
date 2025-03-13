import { verifyUserSession } from "@/utils/session";
import PostForm from "@/components/PostForm";
import { createPost } from "@/app/actions";
import ButtonPublish from "@/components/ButtonPublish";

export default async function NewPost() {
  const { userId } = await verifyUserSession();

  return (
    <div className="container">
      <h1 className="mb-8">New Post</h1>
      <PostForm userId={userId} action={createPost}>
        <ButtonPublish />
      </PostForm>
    </div>
  );
}
