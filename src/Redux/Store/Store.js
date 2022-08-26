import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../../Components/Header/headerSlice'
import cartSlice from '../../Components/CategoryPage/cartSlice'
import productSlice from '../../Components/ProductPage/productSlice'

export const store = configureStore({
    reducer: {
        category: headerSlice,
        cart: cartSlice,
        product: productSlice
    },
})