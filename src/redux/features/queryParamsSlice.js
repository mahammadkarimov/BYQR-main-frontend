import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveQueryParams: '',
};

export const queryParamsSlice = createSlice({
    name: "queryParams",
    initialState,
    reducers: {
        handleQueryParams: (state,action) => {
            state.isActiveQueryParams = action.payload
        },
    },
});

export const { handleQueryParams } = queryParamsSlice.actions;

export default queryParamsSlice.reducer;
