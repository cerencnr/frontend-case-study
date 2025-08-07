import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../presentation/views/Layout.tsx";
import Home from "../presentation/pages/Home.tsx";
import ProductDetail from "../presentation/pages/ProductDetail.tsx";

export default function BaseRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/product/:productId"
                        element={
                            <ProductDetail />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
