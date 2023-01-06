import $ from "jquery";
import { useDispatch } from "react-redux";
import "signalr";
import { test } from "../features/MessageSlice";
const SignalRInit = () => {
    const token = localStorage.getItem("jwtToken");
    var dispatch = useDispatch();
    var connection = $.hubConnection();
    connection.url = process.env.API_URL + "/signalr";
    connection.qs = { token: `${token}` };
    var chatHubProxy = connection.createHubProxy("chatHub");
    chatHubProxy.on("test", function (name, message) {
        console.log(name + " " + message);
    });
    chatHubProxy.on("updateStatusMessage", function (model) {
        console.log(model);
    });
    chatHubProxy.on("sendMessage", function (name) {
        console.log(name);
        // dispatch(test(data));
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
