import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartId: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        changingCardId: (state, action) => {
            state.cartId = action.payload
        }
    },
})

export const { changingCardId } = productSlice.actions

export default productSlice.reducer