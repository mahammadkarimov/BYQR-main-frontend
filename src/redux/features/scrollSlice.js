import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    yScrollValue: 0,
    mainCategoryID: 0
};

export const scrollSlice = createSlice({
    name: "scrollSlice",
    initialState,
    reducers: {
        handleScrollFunc: (state,action) => {
            state.yScrollValue = action.payload
        }, 
        handleMainCategoryID: (state, action) => {
            state.mainCategoryID = action.payload
        }
    },
});

export const { handleScrollFunc, handleMainCategoryID } = scrollSlice.actions;

export default scrollSlice.reducer;
