import { axios } from "./axios";

export const get = async (location: string, params = {}) => {
    return axios
        .get(location, { params })
        .then((response) => response)
        .catch((error) => {
            console.log("api error: ", error);
        });
};
