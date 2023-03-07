import $ from "jquery";
import { useDispatch } from "react-redux";
import "signalr";
import {
    sendMessage,
    updateStatusReadMessage,
    updateMessageInfor,
    initConversation,
} from "../features/MessageSlice";
import {
    addNewGroupAndRemoveTmp,
    updateLastMessage,
    updateLastMessageInfor,
    updateStatusReadLastMessage,
} from "../features/ChatGroupSlice";
const SignalRInit = () => {
    const token = localStorage.getItem("jwtToken");
    let dispatch = useDispatch();
    let connection = $.hubConnection();
    connection.url = process.env.API_URL + "/signalr";

    connection.qs = { token: `${token}` };
    let chatHubProxy = connection.createHubProxy("chatHub");
    chatHubProxy.on("test", function (object) {
        console.log(object);
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
    connection
        .start()
        .done(function () {
            console.log("Now connected, connection ID=" + connection.id);
        })
        .fail(function () {
            console.log("Could not Connect!");
        });

    return <></>;
};
export default SignalRInit;
