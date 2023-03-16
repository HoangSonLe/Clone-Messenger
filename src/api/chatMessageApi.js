import axiosClient from "./axiosClient";

const chatMessageApi = {
    getMessages: (params) => {
        const url = "/chat/GetMessageList";
        return axiosClient.post(url, { ...params });
    },
    sendMessage: (params) => {
        const url = "/chat/SendMessage";
        return axiosClient.post(url, { ...params });
    },
    sendMessageWithCreateConversation: (params) => {
        const url = "/chat/CreateChatGroup";
        return axiosClient.post(url, { ...params });
    },
    readLastMessage: (params) => {
        const url = "/chat/ReadLastMessage";
        return axiosClient.post(url, null, {
            params,
        });
    },
    searchChatGroup: (params) => {
        const url = "/chat/SearchChatGroup";
        return axiosClient.post(url, params );
    },
};
export default chatMessageApi;
