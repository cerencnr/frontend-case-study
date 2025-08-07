import {useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {setSelectedModels} from "../../../store/productSlice.ts";
import MultiSelectFilterBase from "./MultiSelectFilterBase.tsx";

type ModelFilterProps = {
    allModels: string[];
}

export default function ModelFilter({allModels}: ModelFilterProps) {
    return (
        <MultiSelectFilterBase
            title="Models"
            placeholder="Search models..."
            allOptions={allModels}
            selectedOptions={useSelector((state: RootState) => state.product.selectedModels)}
            setSelectedOptions={setSelectedModels}
        />
    );
}
