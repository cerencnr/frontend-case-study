import {SortByFilterOptions} from "./SortByFilterOptions.ts";
import {setSortBy, type SortByFilterOption} from "../../store/productSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {Form} from "react-bootstrap";

export default function SortByFilter() {
    const dispatch = useDispatch();
    const selectedValue = useSelector((state: RootState) => state.product.sortBy);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as SortByFilterOption;

        if (selectedValue === value) {
            dispatch(setSortBy(null));
        } else {
            dispatch(setSortBy(value));
        }
    };

    return (
        <>
            <p className="mb-2">Sort By</p>
            <div style={{ background: "white", borderRadius: '5px', padding: '0.8rem', marginBottom: '1rem' }}>
                <Form>
                    {SortByFilterOptions.map((option) => (
                        <Form.Check
                            key={option.value}
                            id={option.value}
                            name="filter-options"
                            label={option.label}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={onChange}
                            style={{ fontWeight: "normal" }}
                        />
                    ))}
                </Form>
            </div>
        </>
    );
}
