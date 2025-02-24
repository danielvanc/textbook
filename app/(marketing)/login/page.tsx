import { logInUser } from "@/app/actions";
import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";
import config from "@/utils/config";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();

  if (session) redirect(config.appRoute);

  return (
    <form action={logInUser}>
      <LoginButton />
    </form>
  );
}
