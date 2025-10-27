import { CategoryType, FavoritesType, RecipesType } from "./types";

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
