import useSWR from "swr";
import {getProductById} from "../api/product.api.ts";
import type {ProductResponse} from "../api/models.ts";

export default function useProductById(productId: string) {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_product_by_id", () => getProductById(productId));

    let product: ProductResponse | null = null;

    if (response?.data) {
        product = response.data as ProductResponse;

        product = { // this approach is for potential mapping purposes
            createdAt: new Date(product.createdAt),
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,
            model: product.model,
            brand: product.brand,
            id: product.id,
        }
    }

    return {
        data: product,
        isLoading,
        error,
        mutate,
    }
}