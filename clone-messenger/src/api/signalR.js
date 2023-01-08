import $ from "jquery";
import { useDispatch } from "react-redux";
import "signalr";
import { sendMessage } from "../features/MessageSlice";
import { updateLastMesage } from "../features/ChatGroupSlice";
const SignalRInit = () => {
    const token = localStorage.getItem("jwtToken");
    var dispatch = useDispatch();
    var connection = $.hubConnection();
    // connection.url = "https://localhost:44344/signalr";
    connection.url = process.env.API_URL + "/signalr";

    connection.qs = { token: `${token}` };
    var chatHubProxy = connection.createHubProxy("chatHub");
    chatHubProxy.on("test", function (object) {
        console.log(object);
    });
    chatHubProxy.on("updateStatusMessage", function (model) {
        console.log(model);
    });
    chatHubProxy.on("sendMessage", function (data) {
        dispatch(sendMessage(data));
        dispatch(updateLastMesage(data));
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
