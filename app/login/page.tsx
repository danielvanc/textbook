import { logInUser } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();

  if (session) redirect("/home");

  return (
    <form action={logInUser}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
