import SortByFilter from "./SortByFilter.tsx";
import BrandFilter from "./BrandFilter.tsx";
import useProducts from "../../hooks/useProducts.ts";
import ModelFilter from "./ModelFilter.tsx";
import {Col, Row} from "react-bootstrap";

export default function Filters() {
    const { data: products } = useProducts();
    const brands = Array.from(
        new Set(products.map(p => p.brand).filter(Boolean))
    );
    const models = Array.from(
        new Set(products.map(p => p.model).filter(Boolean))
    )

    return(
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden'}}>
            <Row>
                <Col>
                    <SortByFilter />
                </Col>
                <Col>
                    <BrandFilter allBrands={brands}/>
                </Col>
                <Col>
                    <ModelFilter allModels={models}/>
                </Col>
            </Row>
        </div>

    );
}
