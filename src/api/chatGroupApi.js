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
    getUserList:(params) =>{
        const url="/chat/GetUserList";
        return axiosClient.post(url, null, {
            params,
        });
    }
};
export default chatGroupApi;
