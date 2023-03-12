import { Backdrop, CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import pageDefaultApi from "../../../api/pageDefaultApi";
import { setPageDefaultModel } from "../../../features/PageDefaultSlice";
import { configRoutes } from "../../../routes/routes";
import MessageContent from "../../MessageContent/MessageContent";
import Navigation from "../../Navigation/Navigation";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);
export default function DefaultLayout() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { defaultModel } = useSelector((state) => state.pageDefault);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _fetchPageDefaultModel = async () => {
        try {
            let response = await pageDefaultApi.getPageDefaultModel();
            if (response.isSuccess == true) {
                dispatch(setPageDefaultModel(response.data));
            }
        } catch (err) {
            console.log("err", err);
        }
    };
    useEffect(() => {
        isLoggedIn ? _fetchPageDefaultModel() : navigate(configRoutes.login);
    }, [isLoggedIn]);
    //TODO : xu ly case api bi dung vaf nhan nut them chat group loi
    return (
        <>
            {isLoggedIn ? (
                <div className={cx("wrapper")}>
                    <Backdrop sx={{ zIndex: 99 }} open={open}>
                        <CircularProgress />
                    </Backdrop>
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
