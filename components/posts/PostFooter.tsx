import type { User } from "@prisma/client";
import Image from "next/image";

interface PostFooterProps {
  user: Pick<User, "id" | "name" | "image">;
}

export default function PostFooter({ user }: PostFooterProps) {
  return (
    <div className="relative mt-8 flex items-center gap-x-4">
      {user.image && (
        <Image
          alt=""
          src={user.image}
          className="size-10 rounded-full bg-gray-50"
          width={40}
          height={40}
        />
      )}
      <div className="text-sm/6">
        <p className="font-semibold text-gray-900">
          {/* TODO: Add functionality to link to user's profile */}
          <a href="#">
            <span className="absolute inset-0" />
            {user.name}
          </a>
        </p>
      </div>
    </div>
  );
}
