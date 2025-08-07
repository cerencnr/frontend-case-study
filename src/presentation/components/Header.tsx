import './Header.css'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {setSearchQuery} from "../../store/productSlice.ts";
import {useNavigate} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function Header() {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.product.searchQuery);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
        <div className="header-container py-2 d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-3 col-lg-2 text-center text-sm-start brand-box">
                        <p className="eteration" onClick={() => navigate('/')}>
                            Eteration
                        </p>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-8 my-2 my-sm-0 d-flex align-items-center">
                        <input type="text"
                               className="form-control border-0"
                               placeholder="Search products..."
                               value={searchQuery}
                               onChange={(e) => dispatch(setSearchQuery(e.target.value))}/>
                    </div>
                    <div
                        className="col-12 col-sm-3 col-lg-2 text-center text-sm-end action-box text-white align-self-center d-flex justify-content-end gap-4">
                        <div>
                            ${total}
                        </div>
                        <div className="d-flex justify-content-end gap-1">
                            <AccountCircleRoundedIcon />
                            Ceren
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
