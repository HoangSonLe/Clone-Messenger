import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

export default function Header({ title, actions }) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("title")}>
                <h1>{title}</h1>
            </header>
            <div className={cx("actions")}>{actions}</div>
        </div>
    );
}
