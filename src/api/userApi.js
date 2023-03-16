import axiosClient from "./axiosClient";

const userApi = {
    getOnlineUserList: () => {
        const url = "/user/GetOnlineUserList";
        return axiosClient.get(url);
    },
};
export default userApi;
