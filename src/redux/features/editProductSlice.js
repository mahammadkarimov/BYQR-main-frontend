import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    editProductSlug: "",
    editCategorySlug: "",
    editDiscountSlug: ""
}

export const editProductSlice = createSlice({
    name: 'editproduct',
    initialState,
    reducers: {
        editProductSlug: (state,action) => {
            state.editProductSlug = action.payload
        },
        editCategorySlug: (state,action) => {
            state.editCategorySlug = action.payload
        },
        editDiscountSlug: (state, action) => {
            state.editDiscountSlug = action.payload
        } 
    }
})

export const { editProductSlug, editCategorySlug, editDiscountSlug } = editProductSlice.actions

export default editProductSlice.reducer