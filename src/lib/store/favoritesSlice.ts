import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  items: number[]; // product IDs
}

const initialState: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.items.includes(action.payload))
        state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
