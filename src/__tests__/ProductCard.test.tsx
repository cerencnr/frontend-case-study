import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '../presentation/components/Cart/Cart.tsx';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import type { RootState } from '../store';
import configureStore from 'redux-mock-store';

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
    },
}));

const mockStore = configureStore();
const renderWithStore = (initialState: RootState) => {
    const store = mockStore(initialState);
    store.dispatch = vi.fn();
    return {
        store,
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart />
                </BrowserRouter>
            </Provider>
        ),
    };
};

describe('Cart Component', () => {
    it('displays empty cart message', () => {
        renderWithStore({
            cart: { items: [] },
            product: { searchQuery: "", sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        expect(screen.getByText('Shopping cart is empty.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
    });

    it('displays cart items and total correctly', () => {
        renderWithStore({
            cart: {
                items: [
                    {
                        id: '1',
                        name: 'Test Product',
                        price: 100,
                        quantity: 2,
                        image: 'test.jpg',
                    },
                ],
            },
            product: { searchQuery: "", sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('Total: $200.00')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /checkout/i })).not.toBeDisabled();
    });

    it('dispatches actions for increase, decrease, and remove', () => {
        const { store } = renderWithStore({
            cart: {
                items: [
                    {
                        id: '1',
                        name: 'Test Product',
                        price: 50,
                        quantity: 1,
                        image: 'test.jpg',
                    },
                ],
            },
            product: { searchQuery: "", sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        const increaseBtn = screen.getByText('+').closest('button');
        const decreaseBtn = screen.getByText('-').closest('button');
        const removeBtn = screen.getByRole('button', { name: '' });

        fireEvent.click(increaseBtn!);
        fireEvent.click(decreaseBtn!);
        fireEvent.click(removeBtn!);

        expect(store.dispatch).toHaveBeenCalledTimes(3);
    });

    it('calls toast and clearCart on checkout', async () => {
        const toast = (await import('react-hot-toast')).default;
        const { store } = renderWithStore({
            cart: {
                items: [
                    {
                        id: '1',
                        name: 'Test Product',
                        price: 10,
                        quantity: 1,
                        image: 'test.jpg',
                    },
                ],
            },
            product: { searchQuery: "", sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        const checkoutBtn = screen.getByRole('button', { name: /checkout/i });
        fireEvent.click(checkoutBtn);

        expect(toast.success).toHaveBeenCalledWith('Checkout initiated. Total: $10.00');
        expect(store.dispatch).toHaveBeenCalled();
    });
});
