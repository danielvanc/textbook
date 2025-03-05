import { sortPostsByDateDesc } from "@/utils/posts";
import PostFullView from "./PostFullView";

export default function AllUserPosts({
  user,
  posts,
}: {
  posts: Post[];
  user: User;
}) {
  // TODO: Update to use PostShortView component
  return sortPostsByDateDesc(posts).map((post) => (
    <PostFullView key={post.id} post={post} user={user} />
  ));
}
