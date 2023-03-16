import $ from "jquery";
import { useDispatch } from "react-redux";
import "signalr";
import {
    addNewGroupAndRemoveTmp,
    updateChatGroupUser,
    updateLastMessage,
    updateLastMessageInfor,
    updateStatusReadLastMessage,
} from "../features/ChatGroupSlice";
import {
    initConversation,
    sendMessage,
    updateMessageInfor,
    updateMessageUser,
    updateStatusReadMessage,
} from "../features/MessageSlice";
import { fetchGetOnlineUserList, getOnlineUserList } from "../features/UserSlice";
import userApi from "./userApi";
const SignalRInit = () => {
    const token = sessionStorage.getItem("jwtToken");
    let dispatch = useDispatch();
    let connection = $.hubConnection();
    connection.url = process.env.API_URL + "/signalr";

    connection.qs = { token: `${token}` };
    let chatHubProxy = connection.createHubProxy("chatHub");
    chatHubProxy.on("test", function (object) {
        // console.log(object);
    });
    chatHubProxy.on("logout", function () {
        // connection.stop();
    });
    chatHubProxy.on("updateMessageInfo", function (data) {
        dispatch(updateMessageInfor(data));
        dispatch(updateLastMessageInfor(data));
    });
    chatHubProxy.on("updateStatusReadMessage", function (data) {
        dispatch(updateStatusReadMessage(data));
        dispatch(updateStatusReadLastMessage(data));
    });
    chatHubProxy.on("sendMessage", function (data) {
        dispatch(sendMessage(data));
        dispatch(updateLastMessage(data));
    });
    chatHubProxy.on("sendMessageWithCreateConversation", function (data) {
        dispatch(addNewGroupAndRemoveTmp(data.group));
        if (data.isCreateUser) {
            dispatch(initConversation(data.conversation));
        }
    });
    chatHubProxy.on("updateUser", function (data) {
        dispatch(fetchGetOnlineUserList());
        dispatch(updateChatGroupUser(data));
        dispatch(updateMessageUser(data));
    });

    connection
        .start({ jsonp: true })
        .done(function () {
            console.log("Now connected, connection ID=" + connection.id);
        })
        .fail(function (e) {
            console.log("Could not Connect!",e);
        });

    return <></>;
};
export default SignalRInit;
