import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActiveTips: false,
}

export const tipSlice = createSlice({
  name: 'tips',
  initialState,
  reducers: {
    handleService: (state) => {
      state.isActiveTips = !state.isActiveTips
    },
  },
})

export const { handleService } = tipSlice.actions

export default tipSlice.reducer
