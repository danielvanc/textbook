import { signOut } from "@/auth";
import config from "@/utils/config";

export default function LogOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: config.loginRoute });
      }}
    >
      <button type="submit">Log Out</button>
    </form>
  );
}
