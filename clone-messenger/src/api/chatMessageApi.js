import axiosClient from "./axiosClient";

const chatMessageApi = {
    getMessages: (params) => {
        const url = "/GetMessageList";
        return axiosClient.post(url, { ...params });
    },
    sendMessage :(params)=>{
        const url = "/SendMessage";
        return axiosClient.post(url, { ...params });
    }
};
export default chatMessageApi;
