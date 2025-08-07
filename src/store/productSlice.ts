import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SortByFilterOption = 'PRICE_HIGH_TO_LOW' | 'PRICE_LOW_TO_HIGH' | 'NEW_TO_OLD' | 'OLD_TO_NEW';

interface ProductState {
    searchQuery: string;
    sortBy: SortByFilterOption | null;
    selectedBrands: string[];
    selectedModels: string[];
}

const initialState: ProductState = {
    searchQuery: "",
    sortBy: null,
    selectedBrands: [],
    selectedModels: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setSortBy(state, action: PayloadAction<SortByFilterOption | null>) {
            state.sortBy = action.payload;
        },
        setSelectedBrands(state, action: PayloadAction<string[]>) {
            state.selectedBrands = action.payload;
        },
        setSelectedModels(state, action: PayloadAction<string[]>) {
            state.selectedModels = action.payload;
        }
    }
});

export const {
    setSearchQuery,
    setSortBy,
    setSelectedBrands,
    setSelectedModels
} = productSlice.actions;

export default productSlice.reducer;
