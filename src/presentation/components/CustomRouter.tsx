import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import ProductDetail from "../pages/ProductDetail.tsx";

export default function CustomRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
    );
}
