import { auth } from "@/auth";
import LogOut from "@/components/logout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  console.log("session", session);

  if (!session) redirect("/login");

  return (
    <div>
      <main>
        <h1>Textbook</h1>

        <LogOut />
      </main>
    </div>
  );
}
