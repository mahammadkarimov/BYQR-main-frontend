import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActiveFilter: false,
  isActiveRedirect: false,
  isActiveSearch: false
};

export const searchSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    handleSearchFilter: (state) => {
      state.isActiveFilter = !state.isActiveFilter
    },
    handleActiveRedirect: (state) => {
      state.isActiveRedirect = !state.isActiveRedirect
    },
    handleActiveSearch: (state) => {
      state.isActiveSearch = !state.isActiveSearch
    }
  },
});

export const { handleSearchFilter, handleActiveRedirect, handleActiveSearch } = searchSlice.actions;

export default searchSlice.reducer;
