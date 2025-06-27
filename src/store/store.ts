
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
