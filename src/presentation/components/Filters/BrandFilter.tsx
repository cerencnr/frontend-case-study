import {useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {setSelectedBrands} from "../../../store/productSlice.ts";
import MultiSelectFilterBase from "./MultiSelectFilterBase.tsx";

type BrandFilterProps = {
    allBrands: string[];
}

export default function BrandFilter({allBrands}: BrandFilterProps) {

    return (
        <MultiSelectFilterBase
            title="Brands"
            placeholder="Search brands..."
            allOptions={allBrands}
            selectedOptions={useSelector((state: RootState) => state.product.selectedBrands)}
            setSelectedOptions={setSelectedBrands}
        />
    );
}
