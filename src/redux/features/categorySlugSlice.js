import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorySlug: "",
  productSlug: "",
  categoryId: "",
  scrollCategoryId: "",
  scrollIndex: "",
  activeCategory: "",
  maincategoryId: "",
  maincategoryId2: ""
};

export const categorySlugSlice = createSlice({
  name: "slugCategory",
  initialState,
  reducers: {
    selectCategorySlug: (state, action) => {
      state.categorySlug = action.payload;
    },
    selectProductSlug: (state, action) => {
      state.productSlug = action.payload;
    },
    handleCategoryId: (state, action) => {
      state.categoryId = action.payload
    },
    handleScrollCategoryId: (state, action) => {
      state.scrollCategoryId = action.payload
    },
    handleScrollIndex: (state, action) => {
      state.scrollIndex = action.payload
    },
    handleActiveCategoryId: (state, action) => {
      state.activeCategory = action.payload
    },
    handleMaincategoryId: (state, action) => { 
      state.maincategoryId = action.payload
    },
    handleMaincategoryId2: (state, action) => { 
      state.maincategoryId2 = action.payload
    }
  },
});

export const {handleMaincategoryId2, selectCategorySlug, selectProductSlug, handleCategoryId, handleScrollCategoryId, handleScrollIndex, handleActiveCategoryId, handleMaincategoryId} = categorySlugSlice.actions;

export default categorySlugSlice.reducer;
