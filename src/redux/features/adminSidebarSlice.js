import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActiveSidebar: false,
}

export const adminSidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        handleSidebar: (state) => {
            state.isActiveSidebar = !state.isActiveSidebar
        },
    }
})

export const { handleSidebar } = adminSidebarSlice.actions

export default adminSidebarSlice.reducer