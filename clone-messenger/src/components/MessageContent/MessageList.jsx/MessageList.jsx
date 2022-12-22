import React, { memo } from "react";
import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import MessageGroup from "../MessageGroup/MessageGroup";
import Message from "../Message/Message";

const cx = classNames.bind(styles);

function addHours(hours) {
    let date = Date.now();
    var result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}
function addDays(days) {
    let date = Date.now();
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
const message = (userId, date = Date.now()) => ({
    id: Math.random(),
    text: "LalalalaLala laLalalalaLa laaLa lalalaLalalala",
    reactList: [
        {
            reactTypeIcon: "",
            userReact: "Hoang Huy",
        },
    ],
    createDateTime: date,
});
const groupMessageByUserId = (userId, isMyMessage = true) => ({
    id: Math.random(),
    userId,
    messageList: [
        message(userId, addHours(0)),
        message(userId, addHours(0)),
        message(userId, addHours(1)),
    ],
    isMyMessage,
});
const groupMessage = (date = Date.now()) => ({
    id: Math.random(),
    date,
    messageList: [
        groupMessageByUserId(1, true),
        groupMessageByUserId(2, false),
        groupMessageByUserId(1, true),
    ],
});

const listMes = [
    groupMessage(addDays(-3)),
    groupMessage(addDays(-2)),
    groupMessage(addDays(-1)),
];
function MessageList({}) {
    return (
        <div className={cx("wrapper")}>
            {listMes.map((i, index) => (
                <div key={index}>
                    <div className={cx("wrapper")}>
                        <div className={cx("hours")}>
                            {new Date(i.date).toUTCString()}
                        </div>
                        <div className={cx("message-list")}>
                            {i.messageList?.map((j) => {
                                return (
                                    <React.Fragment key={j.id}>
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
