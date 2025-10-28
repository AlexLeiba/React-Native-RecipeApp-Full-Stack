import { CategoryType, FavoritesType, RecipesType } from "./types";
export const USERS = [
  {
    username: "alex_dev",
    email: "alex.dev@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    roles: {
      user: "user",
      editor: "",
      admin: "",
    },
    notifications: true,
    createdAt: "2025-10-01T10:15:00Z",
    updatedAt: "2025-10-10T14:20:00Z",
  },
  {
    username: "maria_writer",
    email: "maria.writer@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    roles: {
      user: "user",
      editor: "editor",
      admin: "",
    },
    notifications: false,
    createdAt: "2025-09-15T08:45:00Z",
    updatedAt: "2025-10-05T09:30:00Z",
  },
  {
    username: "john_admin",
    email: "john.admin@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    roles: {
      user: "user",
      editor: "editor",
      admin: "admin",
    },
    notifications: true,
    createdAt: "2025-08-20T12:00:00Z",
    updatedAt: "2025-10-25T11:00:00Z",
  },
  {
    username: "sophie_viewer",
    email: "sophie.viewer@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    roles: {
      user: "user",
      editor: "",
      admin: "",
    },
    notifications: false,
    createdAt: "2025-10-10T17:40:00Z",
    updatedAt: "2025-10-20T18:10:00Z",
  },
  {
    username: "liam_editor",
    email: "liam.editor@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    roles: {
      user: "user",
      editor: "editor",
      admin: "",
    },
    notifications: true,
    createdAt: "2025-09-30T07:10:00Z",
    updatedAt: "2025-10-22T13:55:00Z",
  },
];

export const LANGUAGE_KEY = "recipe-language";

export const ROLES = ["user", "editor", "admin"];

export const LANGUAGES = [
  { name: "English", id: 1 },
  { name: "Romanian", id: 2 },
];

export const CATEGORIES_DATA: CategoryType[] = [
  {
    name: "My recipies",
    image: require("../assets/food-categories/fish.jpg"),
    _id: "1345",
    userId: "1234",
  },
  {
    name: "Favorites",
    image: require("../assets/food-categories/favorites.png"),
    _id: "2345",
    userId: "12345",
  },
  {
    name: "Beef",
    image: require("../assets/food-categories/beef.png"),
    _id: "111",
    userId: "1111",
  },
  {
    name: "Dessert",
    image: require("../assets/food-categories/dessert.webp"),
    _id: "222",
    userId: "1111",
  },
];

export const FAVORITES: FavoritesType[] = [
  {
    name: "Beef",
    image: require("../assets/food-categories/beef.png"),
    _id: "123456",
    userId: "1111",
    categoryId: "111",
  },
];

export const RECIPES: RecipesType[] = [
  {
    name: "Recipe name",
    image: require("../assets/food-categories/beef.png"),
    imageId: "123456",
    _id: "123456",
    userId: "1111",
    categoryId: "111",
    categoryName: "Cat name",
    description: "Some desc.",
    link: {
      linkUrl: "www.google.com",
      linkName: "Google",
    },

    details: {
      timeToCook: 30,
      servings: 4,

      calories: 400,
      temperature: 100,
      ingredients: [
        "1kg Beef",
        "2 tbs Plain Flour",
        "1 tbs Salt",
        "1 tbs Pepper",
        "1 tbs Olive Oil",
        "1 tbs Onion",
        "1 tbs Garlic",
        "1 tbs Tomato Sauce",
        "1 tbs Tomato",
        "1 tbs Basil",
        "1 tbs Parsley",
        "1 tbs Oregano",
        "1 tbs Sugar",
      ],
    },
  },
  {
    name: "Recipe name",
    image: require("../assets/food-categories/beef.png"),
    imageId: "123456",
    _id: "123456",
    userId: "1111",
    categoryId: "111",
    categoryName: "Cat name",
    description: "Some desc.",
    link: {
      linkUrl: "www.google.com",
      linkName: "Google",
    },

    details: {
      timeToCook: 30,
      servings: 4,

      calories: 400,
      temperature: 100,
      ingredients: [
        "1kg Beef",
        "2 tbs Plain Flour",
        "1 tbs Salt",
        "1 tbs Pepper",
        "1 tbs Olive Oil",
        "1 tbs Onion",
        "1 tbs Garlic",
        "1 tbs Tomato Sauce",
        "1 tbs Tomato",
        "1 tbs Basil",
        "1 tbs Parsley",
        "1 tbs Oregano",
        "1 tbs Sugar",
      ],
    },
  },
  {
    name: "Recipe Dessert",
    image: require("../assets/food-categories/dessert.webp"),
    imageId: "123456",
    _id: "1234567",
    userId: "1111",
    categoryId: "222",
    categoryName: "cat name 22",
    description: "Some desc.",
    link: {
      linkUrl: "www.google.com",
      linkName: "Google",
    },

    details: {
      timeToCook: 30,
      servings: 4,

      calories: 400,
      temperature: 100,
      ingredients: [
        "1kg Beef",
        "2 tbs Plain Flour",
        "1 tbs Salt",
        "1 tbs Pepper",
        "1 tbs Olive Oil",
        "1 tbs Onion",
        "1 tbs Garlic",
        "1 tbs Tomato Sauce",
        "1 tbs Tomato",
        "1 tbs Basil",
        "1 tbs Parsley",
        "1 tbs Oregano",
        "1 tbs Sugar",
      ],
    },
  },
];
