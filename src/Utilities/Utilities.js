
export const getTax = (money) => (
    ((money / 100) * 21).toFixed(2)
)

export const getTotalQuantity = (productList) => {
    let productQuantity = 0;
    productList?.forEach(({ quantity }) => { productQuantity += quantity })
    return productQuantity
}

export const getTotalCost = (productList, currencyIndex) => {
    let cost = 0;
    productList?.forEach(({ prices, quantity }) => { cost += prices?.[currencyIndex].amount * quantity })
    return cost.toFixed(2)
}

export const handleChangeQuantity = (increment, index, props) => {
    const { productList, incrementQuantity, decrementQuantity, removeProduct } = props

    if (increment) {
        incrementQuantity(index)
    }

    if (increment === false && productList?.[index].quantity > 1) {
        decrementQuantity(index)
    }

    if (increment === false && productList?.[index].quantity === 1) {
        removeProduct(index)
    }
}
