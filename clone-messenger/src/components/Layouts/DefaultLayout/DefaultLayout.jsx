import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import pageDefaultApi from "../../../api/pageDefaultApi";
import { setPageDefaultModel } from "../../../features/PageDefaultSlice";
import { toastError } from "../../../generals/defaultActions";
import MessageContent from "../../MessageContent/MessageContent";
import Navigation from "../../Navigation/Navigation";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);
export default function DefaultLayout() {
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
        </div>
    );
}
