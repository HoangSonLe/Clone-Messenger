import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import MessageContent from "../../MessageContent/MessageContent";
import Navigation from "../../Navigation/Navigation";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);
export default function DefaultLayout() {
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
