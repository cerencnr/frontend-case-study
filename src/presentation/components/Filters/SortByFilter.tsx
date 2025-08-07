import {setSortBy, type SortByFilterOption} from "../../../store/productSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {Form} from "react-bootstrap";
import FilterBase from "./FilterBase.tsx";

const SortByFilterOptions = [
    { value: 'PRICE_HIGH_TO_LOW', label: 'Price high to low' },
    { value: 'PRICE_LOW_TO_HIGH', label: 'Price low to high' },
    { value: 'NEW_TO_OLD', label: 'New to old' },
    { value: 'OLD_TO_NEW', label: 'Old to new' },
]

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
        <FilterBase title="Sort By">
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
        </FilterBase>
    );
}
