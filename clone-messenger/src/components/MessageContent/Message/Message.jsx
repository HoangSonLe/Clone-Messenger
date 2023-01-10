import MoodIcon from "@mui/icons-material/Mood";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import classNames from "classnames/bind";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { EMessageStatus } from "../../../const/enum";
import helper from "../../../generals/helper";

import AvatarCustom from "../../ui-kit/Avatar/AvatarCustom";
import IconButtonCustom from "../../ui-kit/IconButton/IconButtonCustom";
import ToolTipCustom from "../../ui-kit/IconButton/ToolTipCustom";
import styles from "./Message.module.scss";
import MessageStatus from "./MessageStatus";

const cx = classNames.bind(styles);
function Message({ data }) {
    // let flagNext = null;
    const { conversation } = useSelector((state) => state.message);
    const { userId } = useSelector((state) => state.auth);
    const { messageStatus, listMembers } = conversation;
    const { messageStatusItemList } = messageStatus;
    let { continuityKeyByUser, messages, isMyMessage } = data;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("message-wrapper")}>
                <div className={cx("receiver-avatar")}>
                    {!isMyMessage ? <AvatarCustom /> : null}
                </div>
                <div className={cx("messages-container")}>
                    {messages.map((i, index) => {
                        //Lấy ra nhưng
                        let beforeLastRead = messageStatusItemList.filter((j) => {
                            return i.createdDate <= j.readTime;
                        });
                        let lastReadExceptCurrentUser = messageStatusItemList.filter(
                            (j) => j.chatMessageId == i.id && j.userId != userId
                        );
                        let inlineStatus = null;
                        if (lastReadExceptCurrentUser.length == 1) {
                            //Render avatar -- chỉ render 1 avatar
                            //=> nếu trên 2 người đã đọc -- trừ người gửi thì ko vào case này
                            let item = lastReadExceptCurrentUser[0];
                            inlineStatus = (
                                <ToolTipCustom
                                    placement="top"
                                    title={`Seen by ${
                                        item.userName
                                    } at ${helper.messageTimeToolTipDisplay(item.readTime)}`}
                                >
                                    <AvatarCustom height={14} width={14} variant="standard" />
                                </ToolTipCustom>
                            );
                        } else if (beforeLastRead.length == listMembers.length) {
                            //Đã đọc hết
                            // inlineStatus = (
                            //     <MessageStatus
                            //         data={lastReadExceptCurrentUser}
                            //         status={EMessageStatus.Undefine}
                            //     />
                            // );
                        } else {
                            //Đang gửi hoặc đã gửi chưa đọc
                            inlineStatus = (
                                <MessageStatus
                                    status={i.messageStatus}
                                />
                            );
                        }
                        return (
                            <div key={i.id} className={cx("message-group-container")}>
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
                                    <div className={cx("status")}>{inlineStatus}</div>
                                </div>
                                {/* <div style={{ height: "4px" }}></div>
                                <div className={cx("status-line")}>
                                    <ToolTipCustom
                                        placement="top"
                                        title={"Seen by Hoang Huy at ....."}
                                    >
                                        <AvatarCustom
                                            styleWrapper={{ margin: "0px 0px 0px 2px" }}
                                            height={14}
                                            width={14}
                                            variant="standard"
                                        />
                                    </ToolTipCustom>
                                    <ToolTipCustom
                                        placement="top"
                                        title={"Seen by Hoang Huy at ....."}
                                    >
                                        <AvatarCustom
                                            styleWrapper={{ margin: "0px 0px 0px 2px" }}
                                            height={14}
                                            width={14}
                                            variant="standard"
                                        />
                                    </ToolTipCustom>
                                    <ToolTipCustom
                                        placement="top"
                                        title={"Seen by Hoang Huy at ....."}
                                    >
                                        <AvatarCustom
                                            styleWrapper={{ margin: "0px 0px 0px 2px" }}
                                            height={14}
                                            width={14}
                                            variant="standard"
                                        />
                                    </ToolTipCustom>
                                </div> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default memo(Message);
