import useSWR from "swr";
import {getProducts} from "../api/product.api.ts";
import type {Product} from "../api/types.ts";
import {mapProductResponse} from "../api/productMapper.ts";

export default function useProducts() {
    const {
        data: response,
        isLoading,
        error,
        mutate,
    } = useSWR("api_products", () => getProducts());

    const products: Product[] = response?.data.map(mapProductResponse) || [];

    return {
        data: products,
        isLoading,
        error,
        mutate,
    }
}
