import './Home.css';
import Pagination from "../components/Pagination/Pagination.tsx";
import useProducts from "../../hooks/useProducts.ts";
import {useEffect, useState} from "react";
import ProductList from "../components/ProductList.tsx";
import type {RootState} from "../../store";
import {useSelector} from "react-redux";
import type {Product} from "../../api/types.ts";
import Filters from "../components/Filters.tsx";
import {Cart} from "../components/Cart.tsx";

const PAGE_SIZE = 12;

export function SideColumn({ position }: { position: 'start' | 'end' }) {
    const alignment = position === 'start' ? 'text-sm-start' : 'text-sm-end';
    return (
        <div className={`col-12 col-sm-3 col-lg-2 text-center ${alignment} action-box`} style={{ height: '100%' }}>
            <Filters />
        </div>
    );
}

export default function Home() {
    const { data: products } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const searchQuery = useSelector((state: RootState) => state.product.searchQuery);
    const sortBy = useSelector((state: RootState) => state.product.sortBy);
    const selectedBrands = useSelector((state: RootState) => state.product.selectedBrands);
    const selectedModels = useSelector((state: RootState) => state.product.selectedModels);

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedBrands.length === 0 || selectedBrands.some(brand => product.brand === brand)) &&
            (selectedModels.length === 0 || selectedModels.some(model => product.model === model))
        )
        .sort((a: Product, b: Product) => {
            if (sortBy === "PRICE_HIGH_TO_LOW") {
                return b.price - a.price;
            } else if (sortBy === "PRICE_LOW_TO_HIGH") {
                return a.price - b.price;
            } else if (sortBy === "NEW_TO_OLD") {
                return b.createdAt.getTime() - a.createdAt.getTime();
            } else if (sortBy === "OLD_TO_NEW") {
                return a.createdAt.getTime() - b.createdAt.getTime();
            }
            return 0;
        });

    const currentProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedBrands, selectedModels, sortBy]);

    return (
        <>
            <SideColumn position={"start"}/>
            <div
                className="col-12 col-sm-6 col-lg-8 my-2 my-sm-0 d-flex flex-column"
                style={{height: '100%'}}
            >
                <div style={{flexGrow: 1, overflowY: 'auto', overflowX: 'hidden'}}>
                    <ProductList currentProducts={currentProducts}/>
                </div>
                <div style={{flexShrink: 0}}>
                    <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
            </div>
            <Cart position="end"/>
        </>

    );
}
