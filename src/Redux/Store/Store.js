import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../../Components/Header/headerSlice'

export const store = configureStore({
    reducer: {
        category: headerSlice,
    },
})