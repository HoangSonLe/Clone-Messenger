import { toast } from "react-toastify";
import swal from "sweetalert";
import axios from "axios";

const defaultOnClick = (e) => {
    e.preventDefault();
    swal("Updating!", "This feature is developing!", "info");
};
const toastError = (err) => {
    toast.error(err);
};
const toastErrorList = (err) => {
    if (err?.length > 0) {
        err.forEach((e) => {
            toast.error(e);
        });
    } else {
        console.log(err);
    }
};

const uploadFiles = async (files, url) => {
    var formData = new FormData();
    for (let index = 0; index < files.length; index++) {
        formData.append("file", files[index]);
    }
    let token = sessionStorage.getItem("jwtToken");
    return axios.post(url ?? "/chat/UploadFiles", formData, {
        baseURL: process.env.API_URL,
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    // return response;
};
const getImageSrc = (srcList, funcCompare) => {
    return srcList.find((i) => {
        let t = funcCompare(i);
        return t;
    });
};
const getImageAvatarSrc = (srcList, findUserId) => {
    let itemFind = getImageSrc(srcList, (i) => i.userId == findUserId);
    return itemFind?.avatarFileSrc;
};
export { defaultOnClick, toastError, toastErrorList, uploadFiles, getImageAvatarSrc };
