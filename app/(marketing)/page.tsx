import config from "@/utils/config";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home - marketing page</h1>
      <p>
        <Link prefetch={true} href={config.loginRoute}>
          Login
        </Link>
      </p>
    </>
  );
}
