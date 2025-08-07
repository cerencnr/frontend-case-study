import {useParams} from "react-router-dom";
import useProductById from "../../hooks/useProductById.ts";
import {Cart} from "../components/Cart.tsx";
import {addToCart} from "../../store/cartSlice.ts";
import {useDispatch} from "react-redux";

export default function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { data: product } = useProductById(productId!);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToCart({
            id: product?.id ?? "",
            name: product?.name ?? "Unknown Product",
            price: product?.price ?? 0,
            quantity: 1,
            image: product?.image ?? "",
        }));
    };

    return (
        <div className="container">
            <div className="row">
                <div
                    className="col-12 col-sm-9 col-lg-10 my-2 my-sm-0 d-flex flex-column"
                    style={{height: '100%'}}
                >
                    <div className="row d-flex bg-white rounded-3 p-3 gap-3 align-items-center justify-content-center">
                        <img src={product?.image} alt={product?.name} className="col-12 col-xl-6 flex-grow-1"
                             style={{maxWidth: '400px', maxHeight: '400px'}}/>
                        <div className="col-12 col-xl-6 d-flex flex-column gap-2 justify-content-between">
                            <h1 className="m-0">{product?.name}</h1>
                            <p className="m-0">${product?.price}</p>
                            <button className="my-2 fw-bold custom-button" onClick={handleAddToCart}>Add to Cart
                            </button>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                </div>
                <Cart />
            </div>
        </div>
    );
}
