import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// interface Acknowledgement {
//     isSuccess: boolean;
//     errorMessage: string[];
//     successMessage: string[];
// }
// interface IAcknowledgement<T = any> extends Acknowledgement {
//     data: T;
// }

const axiosClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    let token = sessionStorage.getItem("jwtToken");
    if (token) {
        if (!config?.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        config.headers.Authorization =`Bearer ${token}`;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            // response.isSuccess = true;
            // return response;
            console.log(response);
        }
        return response;
    }
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
