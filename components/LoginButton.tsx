"use client";

import { useFormStatus } from "react-dom";
import Spinner from "@/components/icons/spinner";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="relative border-gray-600 border-[1px] rounded-md text-grey-600 text-sm font-semibold py-2 px-4"
    >
      {pending ? (
        <div className="flex justify-between whitespace-nowrap space-x-2">
          <Spinner />
          <strong>Logging in...</strong>
        </div>
      ) : (
        "Login with Google"
      )}
    </button>
  );
}
