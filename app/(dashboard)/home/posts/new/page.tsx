import { verifyUserSession } from "@/utils/session";
import PostEditor from "@/components/editorParent";

export default async function NewPost() {
  await verifyUserSession();

  return (
    <div>
      <h1>New Post</h1>
      <PostEditor />
    </div>
  );
}
