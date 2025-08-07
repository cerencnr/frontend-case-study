import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "../../store/cartSlice";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './Cart.css'
import toast from "react-hot-toast";

export function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const onCheckout = () => {
        toast.success(`Checkout initiated. Total: $${total.toFixed(2)}`);
        dispatch(clearCart());
    }

    return (
        <div className={'col-12 col-sm-3 col-lg-2 text-center text-sm-end h-100 p-3 bg-white rounded'}>
            {cartItems.length === 0 ? (
                <p>Shopping cart is empty.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className="d-flex flex-column align-items-end justify-content-between mb-3"
                        >
                            <div style={{ flex: 1 }}>
                                <strong>{item.name}</strong>
                                <p>${item.price}</p>
                            </div>
                            <div className="button-group">
                                <button className="custom-button" onClick={() => dispatch(decreaseQuantity(item.id))}>
                                   <p className="quantity-button">
                                       -
                                   </p>
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button className="custom-button" onClick={() => dispatch(increaseQuantity(item.id))}>
                                    <p className="quantity-button">
                                        +
                                    </p>
                                </button>
                                <button className="custom-button" onClick={() => dispatch(removeFromCart(item.id))}><DeleteOutlineRoundedIcon/></button>
                            </div>
                       </li>
                    ))}
                </ul>
            )}
            <hr />
            <p className="mb-0">Total: ${total.toFixed(2)}</p>
            <button className="mt-2 fw-bold add-to-cart-button" disabled={cartItems.length === 0} onClick={onCheckout}>
                Checkout
            </button>
        </div>
    );
}
