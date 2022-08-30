export const localSotrageMiddleware = (store) => (next) => ({ type, payload }) => {

    const result = next({ type, payload });

    if (type.startsWith('product')) {
        localStorage.setItem('products', JSON.stringify(store.getState().product.productList))
    }

    return result;
}
