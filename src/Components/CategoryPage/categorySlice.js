import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartId: sessionStorage.getItem('cart') ?? '',
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        changingCardId: (state, action) => {
            state.cartId = action.payload
        }
    },
})

export const { changingCardId } = cartSlice.actions

export default cartSlice.reducer