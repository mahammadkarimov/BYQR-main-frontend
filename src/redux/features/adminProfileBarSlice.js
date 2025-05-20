import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActiveProfileBar: false,
    isActiveAllProduct: false,
}

export const adminProfileBarSlice = createSlice({
    name: "profileToggle",
    initialState,
    reducers:{
        handleToggleBar:(state)=>{
            state.isActiveProfileBar = !state.isActiveProfileBar
        },
        handleAllProductState:(state, action)=>{
            state.isActiveAllProduct = action.payload
        },
    }
})

export const {handleToggleBar, handleAllProductState} = adminProfileBarSlice.actions

export default adminProfileBarSlice.reducer