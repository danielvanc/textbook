"use client";

import { use } from "react";
import PostPreview from "../posts/PostPreview";
import { formatDate } from "@/utils/posts";

export function AllPosts({ data }: { data: Promise<AllUserPostsProps> }) {
  const allPosts = use(data);
  const { posts, user } = allPosts;

  return posts.map((post) => {
    const mergedUserAndPost = {
      ...post,
      owner: {
        ...user,
      },
    };
    const formattedDate = formatDate(post.updatedAt);
    return (
      <PostPreview key={post.id} post={mergedUserAndPost}>
        <div className="flex items-center justify-between">
          <time
            dateTime={formattedDate}
            className="text-gray-500 italic text-xs"
          >
            {formattedDate}
          </time>
        </div>
      </PostPreview>
    );
  });
}
