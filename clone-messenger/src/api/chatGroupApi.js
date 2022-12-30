import axiosClient from "./axiosClient";

const chatGroupApi = {
    getList: (params) => {
        const url = "/GetChatGroupList";
        return axiosClient.post(url, { params });
    },
};
export default chatGroupApi;
