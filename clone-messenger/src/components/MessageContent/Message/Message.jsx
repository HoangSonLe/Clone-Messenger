import MoodIcon from "@mui/icons-material/Mood";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReplyIcon from "@mui/icons-material/Reply";
import classNames from "classnames/bind";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { EMessageReadStatus, EMessageStatus } from "../../../const/enum";
import helper from "../../../generals/helper";
import { getImageAvatarSrc } from "../../../generals/utils";

import AvatarCustom from "../../ui-kit/Avatar/AvatarCustom";
import IconButtonCustom from "../../ui-kit/IconButton/IconButtonCustom";
import ToolTipCustom from "../../ui-kit/IconButton/ToolTipCustom";
import styles from "./Message.module.scss";
import MessageStatus from "./MessageStatus";

const cx = classNames.bind(styles);
function Message({ data }) {
    const { conversation } = useSelector((state) => state.message);
    const { currentUserId } = useSelector((state) => state.auth);
    const { messageStatus, listMembers } = conversation;
    const { messageStatusItemList } = messageStatus;
    let { continuityKeyByUser, messages } = data;
    let myAvatar = getImageAvatarSrc(conversation.listMembers, data.userId);
    let isMyMessage = data.userId == currentUserId;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("message-wrapper")}>
                <div className={cx("receiver-avatar")}>
                    {!isMyMessage ? <AvatarCustom srcList={[myAvatar]} /> : null}
                </div>
                <div className={cx("messages-container")}>
                    {messages.map((i, index) => {
                        let process = processMessageReadStatus(
                            currentUserId,
                            listMembers,
                            i,
                            messageStatusItemList
                        );

                        let inlineStatus = null;
                        if (process.status == EMessageReadStatus.ReadOne) {
                            //Render avatar -- chỉ render 1 avatar
                            //=> nếu trên 2 người đã đọc -- trừ người gửi thì ko vào case này
                            let item = process.lastReadExceptSender[0];
                            let imageSrc = getImageAvatarSrc(conversation.listMembers, item.userId);
                            inlineStatus = (
                                <ToolTipCustom
                                    placement="top"
                                    title={`Seen by ${
                                        item.userName
                                    } at ${helper.messageTimeToolTipDisplay(item.readTime)}`}
                                >
                                    <AvatarCustom
                                        srcList={[imageSrc]}
                                        height={14}
                                        width={14}
                                        variant="standard"
                                    />
                                </ToolTipCustom>
                            );
                        } else if (process.status == EMessageReadStatus.ReadAll) {
                            //Đã đọc hết
                            // inlineStatus = (
                            //     <MessageStatus
                            //         data={lastReadExceptCurrentUser}
                            //         status={EMessageStatus.Undefine}
                            //     />
                            // );
                        } else if (process.status == EMessageReadStatus.Undefine) {
                            //Đang gửi hoặc đã gửi chưa đọc
                            inlineStatus = <MessageStatus status={i.messageStatus} />;
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
const processMessageReadStatus = (userId, listMembers, message, messageStatusItemList) => {
    let status = EMessageReadStatus.Undefine;
    //Mảng ds những người đã đọc tin nhắn
    let beforeLastReadUsers = messageStatusItemList?.filter((j) => {
        return message.createdDate <= j.readTime;
    });
    //Mảng ds những người đọc tin nhắn(trừ người gửi)
    let lastReadExceptSender = messageStatusItemList?.filter(
        (j) => j.chatMessageId == message.id && j.userId != message.createdBy
    );
    if (lastReadExceptSender.length == 1) {
        console.log(lastReadExceptSender);
        //Render avatar -- chỉ render 1 avatar
        //=> nếu trên 2 người đã đọc(trừ người gửi) thì ko vào case này- để hiện thì 1 avatar kế bên tin nhắn
        status = EMessageReadStatus.ReadOne;
    } else if (beforeLastReadUsers.length == listMembers.length) {
        //Đã đọc hết
        status = EMessageReadStatus.ReadAll;
    } else {
        //Đang gửi hoặc đã gửi chưa đọc
        status = EMessageReadStatus.Undefine; //Dựa vào status message
    }
    return {
        lastReadExceptSender,
        status,
    };
};
export default memo(Message);
export { processMessageReadStatus };
