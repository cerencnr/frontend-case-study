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

describe('Cart', () => {
    it('displays empty cart message', () => {
        renderWithStore({
            cart: { items: [] },
            product: { searchQuery: "", sortBy: null, selectedBrands: [], selectedModels: [] },
        });
        expect(screen.getByText('Shopping cart is empty.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
    });

    it('displays products and total amount', () => {
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

    it('dispatches increase, decrease, and remove actions', () => {
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

        const plusBtn = screen.getByText('+').closest('button');
        const minusBtn = screen.getByText('-').closest('button');
        const deleteBtn = screen.getByRole('button', { name: '' });

        fireEvent.click(plusBtn!);
        fireEvent.click(minusBtn!);
        fireEvent.click(deleteBtn!);

        expect(store.dispatch).toHaveBeenCalledTimes(3);
    });

    it('calls toast and clears cart on checkout', async () => {
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
