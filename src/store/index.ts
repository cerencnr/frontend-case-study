import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import type {CartItem} from "./cartSlice";

function loadCartFromStorage(): CartItem[] {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}

const preloadedCart = loadCartFromStorage();

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
    },
    preloadedState: {
        cart: {
            items: preloadedCart,
        }
    }
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.items));
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
