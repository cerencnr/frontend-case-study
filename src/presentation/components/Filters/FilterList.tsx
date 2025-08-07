import SortByFilter from "./SortByFilter.tsx";
import BrandFilter from "./BrandFilter.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import ModelFilter from "./ModelFilter.tsx";

export default function FilterList() {
    const { data: products } = useProducts();
    const brands = products.map(p => p.brand);
    const models = products.map(p => p.model);

    return(
        <div className="h-100 d-flex flex-column gap-3 overflow-hidden">
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
