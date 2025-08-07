import SortByFilter from "./SortByFilter.tsx";
import BrandFilter from "./BrandFilter.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import ModelFilter from "./ModelFilter.tsx";

export default function FilterList() {
    const { data: products } = useProducts();
    const brands = Array.from(
        new Set(products.map(p => p.brand).filter(Boolean))
    );
    const models = Array.from(
        new Set(products.map(p => p.model).filter(Boolean))
    )

    return(
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden'}}>
            <div className="row">
                <div className="col-12">
                    <SortByFilter />
                </div>
                <div className="col-12">
                    <BrandFilter allBrands={brands}/>
                </div>
                <div className="col-12">
                    <ModelFilter allModels={models}/>
                </div>
            </div>
        </div>

    );
}
