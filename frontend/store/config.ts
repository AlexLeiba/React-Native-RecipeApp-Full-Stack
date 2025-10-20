import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import categoriesReducer from "./slices/categoriesReducer";
import favoritesReducer from "./slices/favoritesReducer";
import hardcodedRecipeReducer from "./slices/hardcodedRecipeReducer";
import newRecipeReducer from "./slices/recipeReducer";

const rootReducer = combineReducers({
  newRecipe: newRecipeReducer,
  categories: categoriesReducer,
  hardcodedRecipes: hardcodedRecipeReducer,
  favorites: favoritesReducer,
});

// 2️⃣ Create persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["newRecipe", "categories", "hardcodedRecipes", "favorites"], // only persist this slice
};

// 3️⃣ Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5️⃣ Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
