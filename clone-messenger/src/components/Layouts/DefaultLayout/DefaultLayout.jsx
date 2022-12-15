import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";
import DefaultMessageContent from "../../DefaultMessageContent/DefaultMessageContent";
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
        <DefaultMessageContent>
          Select a chat or start a new conversation
        </DefaultMessageContent>
      </div>
    </div>
  );
}
