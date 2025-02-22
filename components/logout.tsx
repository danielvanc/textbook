import { signOut } from "@/auth";
import config from "@/utils/config";
import LogoutButton from "./LogoutButton";

export default function LogOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: config.loginRoute });
      }}
    >
      <LogoutButton />
    </form>
  );
}
