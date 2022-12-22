import { IconButton } from "@mui/material";
import classNames from "classnames/bind";
import React, { memo } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import MoodIcon from "@mui/icons-material/Mood";

import styles from "./Message.module.scss";
import IconButtonCustom from "../../ui-kit/IconButton/IconButtonCustom";
import AvatarCustom from "../../ui-kit/Avatar/AvatarCustom";
import ToolTipCustom from "../../ui-kit/IconButton/ToolTipCustom";

const cx = classNames.bind(styles);
function Message({ data }) {
    let { id, userId, date, messageList, isMyMessage } = data;
    // let { id, userId, date, text, reactList, createDateTime, isMyMessage } =
    // data;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("receiver-avatar")}>
                {!isMyMessage ? <AvatarCustom /> : null}
            </div>
            <div className={cx("messages-container")}>
                {messageList.map((i, index) => {
                    return (
                        <div className={cx("messages")} key={i.id}>
                            <div className={cx("message")}>
                                <div
                                    className={cx("message-row", {
                                        "message-row-receiver": !isMyMessage,
                                    })}
                                >
                                    <div className={cx("spacer")}></div>
                                    <div className={cx("action-menu")}>
                                        <IconButtonCustom
                                            placement={"top"}
                                            title="More"
                                            size="small"
                                        >
                                            <MoreVertIcon fontSize="inherit" />
                                        </IconButtonCustom>
                                        <IconButtonCustom
                                            placement={"top"}
                                            title="Reply"
                                            size="small"
                                        >
                                            <ReplyIcon fontSize="inherit" />
                                        </IconButtonCustom>
                                        <IconButtonCustom
                                            placement={"top"}
                                            title="React"
                                            size="small"
                                        >
                                            <MoodIcon fontSize="inherit" />
                                        </IconButtonCustom>
                                    </div>
                                    <div
                                        className={cx("content", {
                                            "receiver-content": !isMyMessage,
                                            "user-content": isMyMessage,
                                        })}
                                    >
                                        {i.text}
                                    </div>
                                </div>
                            </div>
                            <div className={cx("divide")}></div>
                        </div>
                    );
                })}
            </div>
            <div className={cx("status")}>
                <ToolTipCustom
                    placement="top"
                    title={"Seen by Hoang Huy at ....."}
                >
                    <AvatarCustom height={14} width={14} variant="standard" />
                </ToolTipCustom>
            </div>
        </div>
    );
}
export default memo(Message);
