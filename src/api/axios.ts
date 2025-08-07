import axiosPackage from "axios";

export const axios = axiosPackage.create({
    withCredentials: false,
    baseURL: "https://5fc9346b2af77700165ae514.mockapi.io",
});
