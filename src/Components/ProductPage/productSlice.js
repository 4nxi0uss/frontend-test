import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: {

    },
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductToList: (state, action) => {
            state.productList = action.payload
        }
    },
})

export const { addProductToList } = productSlice.actions

export default productSlice.reducer