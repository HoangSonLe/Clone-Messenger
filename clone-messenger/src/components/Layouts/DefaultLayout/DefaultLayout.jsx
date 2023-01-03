import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import pageDefaultApi from "../../../api/pageDefaultApi";
import { setPageDefaultModel } from "../../../features/PageDefaultSlice";
import { configRoutes } from "../../../routes/routes";
import MessageContent from "../../MessageContent/MessageContent";
import Navigation from "../../Navigation/Navigation";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);
export default function DefaultLayout() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _fetchPageDefaultModel = async () => {
        try {
            var response = await pageDefaultApi.getPageDefaultModel();
            if (response) {
                dispatch(setPageDefaultModel(response.data));
            }
        } catch (err) {
            console.log("err", err);
        }
    };
    useEffect(() => {
        isLoggedIn ? _fetchPageDefaultModel() : navigate(configRoutes.login);
    }, [isLoggedIn]);
    return (
        <>
            {isLoggedIn ? (
                <div className={cx("wrapper")}>
                    <div className={cx("navigation")}>
                        <div className={cx("menu")}>
                            <Navigation />
                        </div>
                        <div className={cx("content-menu")}>
                            <Outlet />
                            {/* Content */}
                        </div>
                    </div>
                    <div className={cx("content")}>
                        <MessageContent />
                    </div>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={true}
                        closeOnClick
                        pauseOnFocusLoss
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            ) : null}
        </>
    );
}
