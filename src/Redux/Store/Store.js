import { configureStore } from '@reduxjs/toolkit'

import { localSotrageMiddleware } from '../Middleware/LocalStoreMiddleware'

import headerSlice from '../../Components/Header/headerSlice'
import cartSlice from '../../Components/CategoryPage/cartSlice'
import productSlice from '../../Components/ProductPage/productSlice'

export const store = configureStore({
    reducer: {
        category: headerSlice,
        cart: cartSlice,
        product: productSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localSotrageMiddleware)
})