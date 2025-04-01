import { findUserByUsername } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import Image from "next/image";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  await verifyUserSession();

  const { user } = await params;
  const userDetails = await findUserByUsername(user);
  if (!userDetails) {
    return <div>User not found</div>;
  }
  const { username, name, image } = userDetails;

  return (
    <div className="container">
      <div className="flex gap-8">
        <div>
          {image ? (
            <Image
              src={image}
              alt={name ?? ""}
              className="rounded-full"
              width={100}
              height={100}
            />
          ) : null}
          <ul className="mt-5">
            <li>(520) Following</li>
            <li>(240) Followers</li>
          </ul>
        </div>
        <div>
          <h1 className="mb-8">
            {name}
            <small className="block font-normal">@{username}</small>
          </h1>
        </div>
      </div>
    </div>
  );
}
