import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../presentation/components/Header/Header.tsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import type { RootState } from '../store';
import { vi } from 'vitest';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

const mockStore = configureStore();

const renderWithStore = (initialState: RootState) => {
    const store = mockStore(initialState);
    store.dispatch = vi.fn();
    return {
        store,
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        ),
    };
};

describe('Header component', () => {
    beforeEach(() => {
        mockedNavigate.mockClear();
    });

    it('renders logo, search bar, and profile correctly', () => {
        renderWithStore({
            cart: { items: [] },
            product: { searchQuery: '', sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        expect(screen.getByText('Eteration')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
        expect(screen.getByText('$0')).toBeInTheDocument();
        expect(screen.getByText('Ceren')).toBeInTheDocument();
    });

    it('dispatches search query update on input change', () => {
        const { store } = renderWithStore({
            cart: { items: [] },
            product: { searchQuery: '', sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        const searchInput = screen.getByPlaceholderText('Search products...');
        fireEvent.change(searchInput, { target: { value: 'laptop' } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'product/setSearchQuery',
            payload: 'laptop',
        });
    });

    it('calculates and displays total cart amount', () => {
        renderWithStore({
            cart: {
                items: [
                    { id: '1', name: 'Phone', price: 300, quantity: 1, image: 'phone.jpg' },
                    { id: '2', name: 'Laptop', price: 1000, quantity: 2, image: 'laptop.jpg' },
                ],
            },
            product: { searchQuery: '', sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        expect(screen.getByText('$2300')).toBeInTheDocument();
    });

    it('navigates to homepage when logo is clicked', () => {
        renderWithStore({
            cart: { items: [] },
            product: { searchQuery: '', sortBy: null, selectedBrands: [], selectedModels: [] },
        });

        const logo = screen.getByText('Eteration');
        fireEvent.click(logo);

        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
});
