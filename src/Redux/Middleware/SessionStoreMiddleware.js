export const sessionStoreMiddleware = (store) => (next) => ({ type, payload }) => {

    const result = next({ type, payload });

    if (type.startsWith('cart')) {
        sessionStorage.setItem('cart', store.getState().cart.cartId)
    }

    if (type === ('header/changingCategory')) {
        sessionStorage.setItem('category', store.getState().category.category)
    }

    return result;
}
