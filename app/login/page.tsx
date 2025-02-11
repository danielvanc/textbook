import { logInUser } from "@/app/actions";

export default function SignIn() {
  return (
    <form action={logInUser}>
      <button type="submit">Signin with Google</button>
    </form>
  );
}
