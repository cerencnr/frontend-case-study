import {Card} from 'react-bootstrap';
import './ProductCard.css'
import type {Product} from "../../api/types.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../store/cartSlice.ts";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
        }));
    };

    return (
        <Card onClick={handleClick} className="product-card h-100 d-flex flex-grow-1 justify-content-between border-0">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                    <p style={{fontSize: '1rem', fontWeight: 'bold', margin: 0}}>
                        {product.name}
                    </p>
                </Card.Title>
                <div>
                    <Card.Text>
                        <p style={{marginBottom: 10}}>
                            ${product.price}
                        </p>
                    </Card.Text>
                    <button onClick={handleAddToCart} className="add-to-cart-button">
                        Add to Cart
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
}
