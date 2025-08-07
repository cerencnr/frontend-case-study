import ProductCard from "./ProductCard.tsx";
import {Col, Row} from "react-bootstrap";
import type {Product} from "../../../api/types.ts";

type ProductListProps = {
    currentProducts: Product[];
}

export default function ProductList({currentProducts}: ProductListProps) {
    return (
        <>
            <Row>
                {currentProducts.map((item) => (
                    <Col
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4 d-flex"
                    >
                        <ProductCard product={item}/>
                    </Col>
                ))}
            </Row>
        </>
    );
}
