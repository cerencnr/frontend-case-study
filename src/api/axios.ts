import axiosPackage from "axios";
import {VITE_BACKEND_URL} from "../config/config.ts";

export const axios = axiosPackage.create({
    withCredentials: false,
    baseURL: VITE_BACKEND_URL,
});
