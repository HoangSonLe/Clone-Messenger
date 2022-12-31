import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

import { setPageDefaultModel } from "./features/PageDefaultSlice";
import pageDefaultApi from "./api/pageDefaultApi";
import { toastError } from "./generals/defaultActions";
function App() {
    const dispatch = useDispatch();
    const _fetchPageDefaultModel = async () => {
        await pageDefaultApi
            .getPageDefaultModel()
            .then((response) => {
                dispatch(setPageDefaultModel(response.data));
            })
            .catch((err) => {
                toastError(err);
            });
    };
    useEffect(() => {
        _fetchPageDefaultModel();
    }, []);
    return (
        <div style={{ height: "100vh" }}>
            <RouterProvider router={routes} />
        </div>
    );
}

export default App;
