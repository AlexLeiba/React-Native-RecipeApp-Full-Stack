export type UserType = {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  accessToken?: string;
  roles: {
    user: string;
    editor?: string;
    admin?: string;
  };
};

export type SettingsType = {
  _id?: string;
  userId: string;
  notifications: boolean;
  language: string;
};

export type RecipesType = {
  _id: string;
  name: string;
  image: string;
  userId: string;
  categoryId: string;
  description?: string;
  link?: {
    linkUrl?: string;
    linkName?: string;
  };
  details: {
    timeToCook?: number;
    servings?: number;
    calories?: number;
    temperature?: number;
    ingredients: string[];
  };
};

export type CategoryType = {
  _id: string;
  name: string;
  image: string;
  userId: string;
};

export type FavoritesType = Pick<
  RecipesType,
  "name" | "image" | "_id" | "categoryId" | "userId"
>;
