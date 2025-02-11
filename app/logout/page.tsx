import { logOutUser } from "../actions";

export default function SignIn() {
  return (
    <form action={logOutUser}>
      <button type="submit">Signout</button>
    </form>
  );
}
