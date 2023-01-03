import axios from "axios";
import { toastError } from "../generals/defaultActions";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
});

axiosClient.interceptors.request.use(async (config) => {
    var token = localStorage.getItem("jwtToken");
    console.log(config);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (err) => {
        // Handle errors
        console.log(err);
        if (err?.response.data.length > 0) {
            err?.response.data.forEach((e) => {
                toastError(e);
            });
        } else {
            toastError("Error.Please try again");
        }
    }
);

export default axiosClient;
