import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import type {RootState} from "../../store";
import {setSelectedBrands} from "../../store/productSlice.ts";

type BrandFilterProps = {
    allBrands: string[];
}

export default function BrandFilter({allBrands}: BrandFilterProps) {
    const dispatch = useDispatch();
    const selectedBrands = useSelector((state: RootState) => state.product.selectedBrands);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBrands = allBrands.filter(brand =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckboxChange = (brand: string) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        dispatch(setSelectedBrands(updatedBrands));
    }

    return (
        <>
            <p className="mb-2 fw-bold">Brands</p>
            <div style={{background: "white", borderRadius: '5px', padding: '0.8rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    className="form-control form-control-sm mb-2"
                    placeholder="Search brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="form-check-container" style={{maxHeight: "150px", overflowY: "auto"}}>
                    {filteredBrands.map((brand) => (
                        <div key={brand} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleCheckboxChange(brand)}
                            />
                            <label className="form-check-label" style={{fontWeight: "normal"}}
                                   htmlFor={`brand-${brand}`}>
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}
