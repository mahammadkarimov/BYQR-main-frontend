import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveFeedback: '',
    isActiveRating: ''
}

export const activeFeedbackSlice = createSlice({
    name: "feedbackService",
    initialState,
    reducers: {
        handleActiveFeedback: (state, action) => {
            state.isActiveFeedback = action.payload
        },
        handleActiveRating: (state, action) => {
            state.isActiveRating = action.payload
        },
    }
})

export const { handleActiveRating, handleActiveFeedback } = activeFeedbackSlice.actions

export default activeFeedbackSlice.reducer