export interface Post {
  id?: number;
  title: string;
  content: string;
  timestamp: Date;
  user: {
    id?: number;
    username: string;
    profilePicUrl: string;
  };
  category: {
    id?: number;
    title: string;
  };
}
