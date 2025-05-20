import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      const indexToRemove = state.items.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (indexToRemove !== -1) {
        state.items.splice(indexToRemove, 1);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
