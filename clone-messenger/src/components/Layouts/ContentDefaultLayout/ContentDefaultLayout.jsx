import classNames from "classnames/bind";
import styles from "./ContentDefaultLayout.module.scss";
const cx = classNames.bind(styles);

export default function ContentDefaultLayout({ title, children, actions }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-content")}>
        <header className={cx("title")}>
          <h1>{title}</h1>
        </header>
        <div className={cx("actions")}>{actions}</div>
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
}
