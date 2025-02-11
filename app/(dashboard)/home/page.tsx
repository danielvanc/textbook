import { auth } from "@/auth";
import LogOut from "@/components/logout";

export default async function Home() {
  const session = await auth();
  console.log("session", session);

  return (
    <div>
      <main>
        <h1>Textbook</h1>

        <LogOut />
      </main>
    </div>
  );
}
