import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: 'all',
    chosenCurrencies: Number(localStorage.getItem('currencieIndex')),
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        changingCategory: (state, action) => {
            state.category = action.payload
        },
        changingCurrencies: (state, action) => {
            state.chosenCurrencies = action.payload
        },
    },
})

export const { changingCategory, changingCurrencies } = headerSlice.actions

export default headerSlice.reducer