import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from "../../store/cartSlice";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './Cart.css'
import toast from "react-hot-toast";

export function Cart({ position }: { position: 'start' | 'end' }) {
    const alignment = position === 'start' ? 'text-sm-start' : 'text-sm-end';
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const onCheckout = () => {
        toast.success(`Checkout initiated. Total: $${total.toFixed(2)}`);
        dispatch({ type: 'cart/clearCart' });
    }

    return (
        <div className={`col-12 col-sm-3 col-lg-2 text-center ${alignment} action-box`} style={{ height: '100%' }}>
            <div style={{ padding: "1rem", background: "white", borderRadius: '5px'}}>
                {cartItems.length === 0 ? (
                    <p>Shopping cart is empty.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "space-between",
                                    marginBottom: "1rem",
                                }}
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
        </div>
    );
}
