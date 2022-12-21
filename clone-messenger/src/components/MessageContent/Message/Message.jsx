import classNames from "classnames/bind";
import { memo } from "react";

import styles from "./Message.module.scss";

const cx = classNames.bind(styles);

function Message({ data }) {
    let { id, userId, date, text, reactList, createDateTime, isMyMessage } =
        data;

    console.log("message", data);
    return <div>{text}</div>;
}
export default memo(Message);

const MessageGroup = memo(({ data }) => {
    let { id, date, messageList } = data;
    console.log("messagegroup");
    return (
        <div className={cx("wrapper")}>
            <div className={cx("hours")}>
                Date:{new Date(date).toUTCString()}
            </div>
            <div className={cx("message")}>
                {messageList?.map((i) => (
                    <Message key={i.id} data={i} />
                ))}
            </div>
        </div>
    );
});
export { MessageGroup };
