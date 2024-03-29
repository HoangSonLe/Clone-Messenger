import axiosClient from "./axiosClient";

const authApi = {
    login: (params) => {
        const url = "/user/login";
        return axiosClient.post(url, { ...params });
    },
    logout: () => {
        const url = "/user/logout";
        return axiosClient.get(url);
    },
    register: (params) => {
        const url = "/user/Register";
        return axiosClient.post(url, { ...params });
    },
    loginFacebook: (params) => {
        const url = "/user/LoginFacebook";
        return axiosClient.get(url);
    },
};
export default authApi;
