export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface Profile {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export type Tag = string;
