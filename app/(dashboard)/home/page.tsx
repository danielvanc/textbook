import { auth } from "@/auth";
import LogOut from "@/components/logout";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) redirect("/login");

  return (
    <div>
      <main>
        <h1>Textbook</h1>

        <LogOut />
      </main>
    </div>
  );
}
