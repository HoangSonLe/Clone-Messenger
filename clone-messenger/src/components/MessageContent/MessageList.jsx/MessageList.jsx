import classNames from "classnames/bind";
import React, { memo } from "react";
import { useSelector } from "react-redux";

import helper from "../../../generals/helper";
import Message from "../Message/Message";
import styles from "./MessageList.module.scss";

const cx = classNames.bind(styles);

function MessageList() {
    const { conversation } = useSelector((state) => state.message);
    return (
        <div className={cx("wrapper")}>
            {conversation.groupMessageListByTime.map((i, index) => (
                <div key={i.continuityKeyByTime}>
                    <div className={cx("wrapper")}>
                        {/* Futures group messages by time */}
                        <div className={cx("hours")}>
                            {helper.messageTimeDisplay(i.groupMessageTime)}
                        </div>
                        <div className={cx("message-list")}>
                            {i.groupMessageListByUser?.map((j) => {
                                return (
                                    <React.Fragment key={j.continuityKeyByUser}>
                                        <Message data={j} />
                                        <div
                                            className={cx("last-divide")}
                                        ></div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default memo(MessageList);
