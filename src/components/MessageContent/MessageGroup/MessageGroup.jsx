import React, { memo } from "react";
import classNames from "classnames/bind";
import Message from "../Message/Message";

import styles from "./MessageGroup.module.scss";

const cx = classNames.bind(styles);

const MessageGroup = memo(({ data }) => {
    let prev = null;
    let { id, date, messageList } = data;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("hours")}>
                Date:{new Date(date).toUTCString()}
            </div>
            <div className={cx("message-list")}>
                {messageList?.map((i) => {
                    const comp =
                        !prev || prev == i.userId ? (
                            <Message key={i.id} data={i} />
                        ) : (
                            <React.Fragment key={i.id}>
                                <div className={cx("last-divide")}></div>
                                <Message data={i} />
                            </React.Fragment>
                        );
                    prev = i.userId;
                    return comp;
                })}
            </div>
        </div>
    );
});
export default MessageGroup;
