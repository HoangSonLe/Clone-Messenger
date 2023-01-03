import axiosClient from "./axiosClient";

const pageDefaultApi = {
    getPageDefaultModel: () => {
        const url = "/chat/GetPageDefaultModel";
        return axiosClient.get(url);
    },
};
export default pageDefaultApi;
