import { findUserByUsername } from "@/utils/db";
import { verifyUserSession } from "@/utils/session";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

          <div>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">Your posts</TabsContent>
              <TabsContent value="bookmarks">Your bookmarks</TabsContent>
              <TabsContent value="following">
                View the accounts you are following here.
              </TabsContent>
              <TabsContent value="followers">
                See who follows you here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
