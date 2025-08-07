import FilterBase from "./FilterBase.tsx";
import {useState} from "react";
import {useDispatch} from "react-redux";

interface MultiSelectFilterProps {
    title: string;
    placeholder: string;
    allOptions: string[];
    selectedOptions: string[];
    setSelectedOptions: (payload: string[]) => any;
}

export default function MultiSelectFilterBase({
        title,
        placeholder,
        allOptions,
        selectedOptions,
        setSelectedOptions
}: MultiSelectFilterProps) {

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const filteredOptions = allOptions.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckboxChange = (brand: string) => {
        const updatedBrands = selectedOptions.includes(brand)
            ? selectedOptions.filter(b => b !== brand)
            : [...selectedOptions, brand];
        dispatch(setSelectedOptions(updatedBrands));
    }

    return (
        <FilterBase title={title}>
            <input
                type="text"
                className="form-control form-control-sm mb-2"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="form-check-container" style={{maxHeight: "150px", overflowY: "auto"}}>
                {filteredOptions.map((item) => (
                    <div key={item} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`item-${item}`}
                            checked={selectedOptions.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                        />
                        <label className="form-check-label" style={{fontWeight: "normal"}}
                               htmlFor={`item-${item}`}>
                            {item}
                        </label>
                    </div>
                ))}
            </div>
        </FilterBase>
    );
}