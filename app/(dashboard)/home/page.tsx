import LogOut from "@/components/logout";
import { getUsersPosts } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";

export default async function Home() {
  const userId = await verifyUserSession();
  const { posts } = await getUsersPosts(userId);

  console.log("posts", posts);

  return (
    <div>
      <main>
        <h1>Textbook</h1>

        <LogOut />
      </main>
    </div>
  );
}
