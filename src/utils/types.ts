export interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
}

export type PostType = {
  id: string;
  createdAt: string;
  heading?: string;
  details?: string;
  imglink?: string;
  visibility: 'public' | 'private' | 'friends';
}