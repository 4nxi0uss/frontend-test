import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: JSON.parse(localStorage.getItem('products')) ?? [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductToList: (state, { type, payload }) => {
            state.productList = [...state.productList, payload]
        },
        incrementQuantity: (state, { type, payload }) => {
            state.productList[payload] = { ...state.productList[payload], quantity: state.productList[payload].quantity += 1 }
        },
        decrementQuantity: (state, { type, payload }) => {
            state.productList[payload] = { ...state.productList[payload], quantity: state.productList[payload].quantity -= 1 }
        },
        removeProduct: (state, { type, payload }) => {
            state.productList.splice(payload, 1)
        },
    },
})

export const { addProductToList, incrementQuantity, decrementQuantity, removeProduct } = productSlice.actions

export default productSlice.reducer