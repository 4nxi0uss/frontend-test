import { configureStore } from '@reduxjs/toolkit'

import { localSotrageMiddleware } from '../Middleware/LocalStoreMiddleware'
import { sessionStoreMiddleware } from '../Middleware/SessionStoreMiddleware'

import headerSlice from '../../Components/Header/headerSlice'
import categorySlice from '../../Components/CategoryPage/categorySlice'
import productSlice from '../../Components/ProductPage/productSlice'

export const store = configureStore({
    reducer: {
        category: headerSlice,
        cart: categorySlice,
        product: productSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localSotrageMiddleware).concat(sessionStoreMiddleware)
})