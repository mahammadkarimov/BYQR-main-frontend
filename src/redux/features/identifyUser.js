import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userType: '',
    feedbackState: '',
}

export const identifyUser = createSlice({
    name: "identifyUser",
    initialState,
    reducers: {
        handleIdentifyUser: (state, action) => {
            state.userType = action.payload
        },
        handleRestFeedbackState: (state, action) => {
            state.feedbackState = action.payload
        },
    }
})

export const { handleIdentifyUser, handleRestFeedbackState } = identifyUser.actions

export default identifyUser.reducer