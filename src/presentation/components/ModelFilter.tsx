import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {useState} from "react";
import {setSelectedModels} from "../../store/productSlice.ts";

type ModelFilterProps = {
    allModels: string[];
}

export default function ModelFilter({allModels}: ModelFilterProps) {
    const dispatch = useDispatch();
    const selectedModels = useSelector((state: RootState) => state.product.selectedModels);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredModels = allModels.filter(model =>
        model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckboxChange = (model: string) => {
        const updatedModels = selectedModels.includes(model)
            ? selectedModels.filter(b => b !== model)
            : [...selectedModels, model];
        dispatch(setSelectedModels(updatedModels));
    }

    return (
        <>
            <p className="mb-2 fw-bold">Models</p>
            <div style={{background: "white", borderRadius: '5px', padding: '0.8rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="Search models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="form-check-container" style={{maxHeight: "150px", overflowY: "auto"}}>
                    {filteredModels.map((model) => (
                        <div key={model} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`model-${model}`}
                                checked={selectedModels.includes(model)}
                                onChange={() => handleCheckboxChange(model)}
                            />
                            <label className="form-check-label" style={{fontWeight: "normal"}}
                                   htmlFor={`model-${model}`}>
                                {model}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}