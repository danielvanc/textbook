import { verifyUserSession } from "@/utils/session";

export default async function NewPost() {
  await verifyUserSession();

  return <div>New Post</div>;
}
