interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Post {
  updatedAt: Date;
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}
