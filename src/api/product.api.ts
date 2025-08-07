import * as api from './api';

export const getProducts = async () => {
    return api.get("/products")
}

export const getProductById = async (productId: string) => {
    return api.get(`/products/${productId}`)
}
