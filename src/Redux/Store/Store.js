import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../../Components/Header/headerSlice'
import productSlice from '../../Components/CategoryPage/productSlice'

export const store = configureStore({
    reducer: {
        category: headerSlice,
        product: productSlice
    },
})