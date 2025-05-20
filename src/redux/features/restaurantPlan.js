import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurantPlan: '',
}

export const restaurantPlan = createSlice({
    name: "restaurantPlan",
    initialState,
    reducers: {
        handleRestPlan: (state,action) => {
            state.restaurantPlan = action.payload
        },
    }
})

export const { handleRestPlan } = restaurantPlan.actions

export default restaurantPlan.reducer