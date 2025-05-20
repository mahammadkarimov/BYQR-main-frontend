import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveService: false,
}

export const activeServiceSlice = createSlice({
    name: "activeService",
    initialState,
    reducers: {
        handleActiveService: (state,action) => {
            state.isActiveService = action.payload
        },
    }
})

export const { handleActiveService } = activeServiceSlice.actions

export default activeServiceSlice.reducer