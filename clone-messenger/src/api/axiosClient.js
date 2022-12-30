import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
    },
});

axiosClient.interceptors.request.use(async (config) => {
    // const token = await getFirebaseToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;
