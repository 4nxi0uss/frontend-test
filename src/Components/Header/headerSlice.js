import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: 'all',
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        changingCategory: (state, action) => {
            state.category = action.payload
        },
    },
})

export const { changingCategory } = headerSlice.actions

export default headerSlice.reducer