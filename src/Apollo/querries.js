export const PRODUCT_SHORT_QUERY = `query getProduct($id: String!) {
  product(id: $id) {
    id
    name
    gallery
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        symbol
      }
      amount
    }
    brand
  }
}`

export const PRODUCT_QUERY = `query getProduct($id: String!) {
  product(id: $id) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}`

export const CURRENCIES_QUERY = `{
    currencies {
      label
      symbol
    }
  }
  `

export const CATEGORY_PRODUCT_QUERY = `query getCategoryProducts($category: String!) {
  category(input: { title: $category }) {
    products {
      id
      name
      inStock
      gallery
      description
      category
      brand
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
}`

export const CATEGORY_QUERY = `{
  categories {
    name
  }
}`