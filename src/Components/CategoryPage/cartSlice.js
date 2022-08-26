import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartId: '',
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