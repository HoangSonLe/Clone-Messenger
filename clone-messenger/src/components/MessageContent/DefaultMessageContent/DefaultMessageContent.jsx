import classNames from "classnames/bind";

import styles from "./DefaultMessageContent.module.scss";

const cx = classNames.bind(styles);

export default function DefaultMessageContent() {
    return (
        <div className={cx("content")}>
            Select a chat or start a new conversation
        </div>
    );
}
