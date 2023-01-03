import axiosClient from "./axiosClient";

const chatGroupApi = {
    getList: (params) => {
        const url = "/chat/GetChatGroupList";
        return axiosClient.post(url, { ...params });
    },
    getChatGroupDetail: (params) => {
        const url = "/chat/GetChatGroupDetail";
        return axiosClient.post(url, { ...params });
    },
};
export default chatGroupApi;
