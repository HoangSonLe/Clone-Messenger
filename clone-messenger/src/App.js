import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
    // var {isLoggedIn} = useSelector(state => state.auth);
    var isLoggedIn = true;
    var routing = useRoutes(routes(isLoggedIn));
    return <div style={{ height: "100vh" }}>{routing}</div>;
}

export default App;
