import axiosClient from "./axiosClient";

const pageDefaultApi = {
    getPageDefaultModel: () => {
        const url = "/GetPageDefaultModel";
        return axiosClient.get(url);
    },
};
export default pageDefaultApi;
