import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        increaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        }
    },
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
