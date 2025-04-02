interface AllUserPostsProps {
  posts: (Post & { bookmarks: Pick<Bookmark, "userId" | "id">[] })[];
  user: Pick<User, "id" | "name" | "email" | "image">;
}

interface PostPreviewProps {
  post: Post & {
    owner: Pick<User, "id" | "name" | "email" | "image">;
    bookmarks: Pick<Bookmark, "userId" | "id">[];
  };
  children: React.ReactNode;
  slug?: string;
}

interface EditableStateProps {
  message: string;
  error: boolean;
  postSlug?: string;
  completed: boolean;
}

interface BookmarksProps {
  id: string;
  post: {
    id: string;
    updatedAt: Date;
    title: string;
    slug: string | null;
    owner: {
      name: string | null;
      id: string;
      username: string | null;
    };
  };
}
