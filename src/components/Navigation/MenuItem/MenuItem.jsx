import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";
const cx = classNames.bind(styles);
export default function MenuItem({ href, icon }) {
  return (
    <NavLink to={href} className={cx("menuItem")}>
      {({ isActive }) => (
        <div className={cx("icon", isActive ? "active" : undefined)}>
          {icon}
        </div>
      )}
    </NavLink>
  );
}
