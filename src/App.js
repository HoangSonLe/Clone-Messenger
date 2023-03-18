import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, useRoutes } from "react-router-dom";
import SignalRInit from "./api/signalR";
import MobileView from "./components/MobileView/MobileView";
import useIsMobile from "./hooks/useIsMobile";
import { routes } from "./routes/routes";

function App() {
    let { token } = useSelector((state) => state.auth);
    var routeList = routes(token);
    let routing = createBrowserRouter([...routeList]);
    let isMobile = useIsMobile().isMobile;
    return (
        <>
            {isMobile ? (
                <MobileView />
            ) : (
                <div style={{ height: "100vh" }}>
                    {token ? <SignalRInit /> : null}
                    {/* {routing} */}
                    <RouterProvider router={routing} />
                </div>
            )}
        </>
    );
}

export default App;
