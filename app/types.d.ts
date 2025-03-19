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
