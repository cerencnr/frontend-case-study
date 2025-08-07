import type {Product} from "./types.ts";
import type {ProductResponse} from "./models.ts";

export function mapProductResponse(item: ProductResponse): Product | null {
    if (!item) {
        return null;
    }
    return {
        ...item,
        createdAt: new Date(item.createdAt),
    }
}
