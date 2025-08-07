import './Header.css'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {setSearchQuery} from "../../../store/productSlice.ts";
import {useNavigate} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Logo() {
    const navigate = useNavigate();
    return (
        <div className="brand-box col-12 col-sm-3 col-lg-2 text-sm-start">
            <p className="eteration" onClick={() => navigate('/')}>
                Eteration
            </p>
        </div>
    );
}

function SearchBar() {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: RootState) => state.product.searchQuery);
    return (
        <div className="col-12 col-sm-6 col-lg-8 my-2 my-sm-0 d-flex align-items-center">
            <input type="text"
                   className="form-control border-0"
                   placeholder="Search products..."
                   value={searchQuery}
                   onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
        </div>
    );
}

function Profile() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
    return (
        <div
            className="col-12 col-sm-3 col-lg-2 text-sm-end balance">
            <div>
                ${total}
            </div>
            <div className="d-flex justify-content-end gap-1">
                <AccountCircleRoundedIcon/>
                Ceren
            </div>
        </div>
    );
}

export default function Header() {
    return (
        <div className="header-container">
            <div className="container-fluid">
                <div className="row">
                    <Logo/>
                    <SearchBar />
                    <Profile/>
                </div>
            </div>
        </div>
    );
}
