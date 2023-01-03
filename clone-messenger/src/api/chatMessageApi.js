import axiosClient from "./axiosClient";

const chatMessageApi = {
    getMessages: (params) => {
        const url = "/chat/GetMessageList";
        return axiosClient.post(url, { ...params });
    },
    sendMessage :(params)=>{
        const url = "/chat/SendMessage";
        return axiosClient.post(url, { ...params });
    }
};
export default chatMessageApi;
