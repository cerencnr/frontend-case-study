import useSWR from "swr";
import {getProductById} from "../api/product.api.ts";
import type {Product} from "../api/types.ts";
import {mapProductResponse} from "../api/productMapper.ts";

export default function useProductById(productId: string) {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_product_by_id", () => getProductById(productId));

    const product: Product | null = mapProductResponse(response?.data);

    return {
        data: product,
        isLoading,
        error,
        mutate,
    }
}
