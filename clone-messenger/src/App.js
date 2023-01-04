import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import signalR from "./api/signalR";
import { routes } from "./routes/routes";

function App() {
    useEffect(() => {
        signalR();
    }, []);
    var { token } = useSelector((state) => state.auth);
    var routing = useRoutes(routes(token));
    return <div style={{ height: "100vh" }}>{routing}</div>;
}

export default App;
