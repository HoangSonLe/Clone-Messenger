import axios from "axios";
import { toastError } from "../generals/utils.js";

const axiosClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
});

axiosClient.interceptors.request.use(async (config) => {
    let token = sessionStorage.getItem("jwtToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            response.isSuccess = true;
            return response.data;
        }
        return response;
    },
    // (err) => {
    //     // Handle errors
    //     console.log(err);
    //     if (err.response.status == 401) {
    //         window.location.href = "/login";
    //     }
    //     if (err?.response.data.length > 0) {
    //         err?.response.data.forEach((e) => {
    //             toastError(e);
    //         });
    //     } else {
    //         toastError("Error.Please try again");
    //     }
    //     err.response.isSuccess = false;
    //     return err.response;
    // }
);

export default axiosClient;
