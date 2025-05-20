import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveService: false,
};

export const serviceSlice = createSlice({
    name: "callService",
    initialState,
    reducers: {
        handleService: (state, action) => {
            state.isActiveService = action.payload
        },
    },
});

export const { handleService } = serviceSlice.actions;

export default serviceSlice.reducer;
