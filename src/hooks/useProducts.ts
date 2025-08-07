import useSWR from "swr";
import {getProducts} from "../api/product.api.ts";
import type {ProductResponse} from "../api/models.ts";

export default function useProducts() {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_products", () => getProducts());

    let products: ProductResponse[] = [];

    if (response?.data) {
        products = response.data.map((item: ProductResponse) => {
            return { // this approach is for potential mapping purposes
                createdAt: item.createdAt,
                name: item.name,
                image: item.image,
                price: item.price,
                description: item.description,
                model: item.model,
                brand: item.brand,
                id: item.id,
            }
        })
    }

    return {
        data: products,
        isLoading,
        error,
        mutate,
    }
}