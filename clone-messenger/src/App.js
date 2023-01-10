import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import SignalRInit from "./api/signalR";
import { routes } from "./routes/routes";

function App() {
    let { token } = useSelector((state) => state.auth);
    let routing = useRoutes(routes(token));
    return (
        <div style={{ height: "100vh" }}>
            {token ? <SignalRInit /> : null}
            {routing}
        </div>
    );
}

export default App;
