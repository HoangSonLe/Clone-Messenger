import $ from "jquery";
import "signalr";
const signalR = () => {
    var connection = $.hubConnection();
    connection.url = process.env.API_URL + "/signalr";
    var chatHubProxy = connection.createHubProxy("ChatHub");
    chatHubProxy.on("test", function (name, message) {
        console.log(name + " " + message);
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
export default signalR;
