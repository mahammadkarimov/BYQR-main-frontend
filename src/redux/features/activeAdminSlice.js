import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveAdmin: 0,
};

export const activeAdminSlice = createSlice({
    name: "activeAdminSlice",
    initialState,
    reducers: {
        handleActiveAdmin: (state,action) => {
            state.isActiveAdmin = action.payload
        },
    },
});

export const { handleActiveAdmin } = activeAdminSlice.actions;

export default activeAdminSlice.reducer;
