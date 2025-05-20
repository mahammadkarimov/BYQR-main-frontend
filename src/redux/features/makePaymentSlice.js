import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActivePayment: false,
};

export const paymentSlice = createSlice({
    name: "makePayment",
    initialState,
    reducers: {
        handlePayment: (state, action) => {
            state.isActivePayment = action.payload
        },
    },
});

export const { handlePayment } = paymentSlice.actions;

export default paymentSlice.reducer;
