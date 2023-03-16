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
import AvatarGroup from "../../ui-kit/Avatar/AvatarGroup";
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
    let isOnline = conversation?.listMembers.some(
        (i) => i.isOnline == true && i.userId != currentUserId
    );

    return (
        <div className={cx("wrapper")}>
            <div className={cx("message-wrapper")}>
                <div className={cx("receiver-avatar")}>
                    {!isMyMessage ? (
                        <AvatarCustom isOnline={isOnline} srcList={[myAvatar]} />
                    ) : null}
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
                        let outStatus = null;
                        switch (process.status) {
                            case EMessageReadStatus.ReadOne:
                                //Render avatar -- chỉ render 1 avatar
                                //=> nếu trên 2 người đã đọc -- trừ người gửi thì ko vào case này
                                let item = process.lastReadExceptSender[0];
                                let imageSrc = getImageAvatarSrc(
                                    conversation.listMembers,
                                    item.userId
                                );
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
                                break;
                            case EMessageReadStatus.ReadSome:
                            case EMessageReadStatus.ReadAllLast:
                                if (process.lastReadExceptSender.length > 0) {
                                    let tmp = process.lastReadExceptSender.map((j) => {
                                        let t = {
                                            ...j,
                                            imageSrc: getImageAvatarSrc(
                                                conversation.listMembers,
                                                j.userId
                                            ),
                                        };
                                        return t;
                                    });
                                    outStatus = (
                                        <>
                                            <div
                                                className={cx("status-line", {
                                                    "status-line-float": !isMyMessage,
                                                })}
                                            >
                                                <AvatarGroup
                                                    max={5}
                                                    data={tmp}
                                                    customRender={(item) => (
                                                        <ToolTipCustom
                                                            key={item.userId}
                                                            placement="top"
                                                            title={`Seen by ${
                                                                item.displayName
                                                            } at ${helper.messageTimeToolTipDisplay(
                                                                item.readTime
                                                            )}`}
                                                        >
                                                            <AvatarCustom
                                                                styleWrapper={{
                                                                    margin: "0px 0px 0px 2px",
                                                                }}
                                                                srcList={[item.imageSrc]}
                                                                height={14}
                                                                width={14}
                                                            />
                                                        </ToolTipCustom>
                                                    )}
                                                ></AvatarGroup>
                                            </div>
                                        </>
                                    );
                                }
                                break;
                            case EMessageReadStatus.Undefine:
                                //Đang gửi hoặc đã gửi chưa đọc
                                inlineStatus = <MessageStatus status={i.messageStatus} />;
                                break;
                            case EMessageReadStatus.ReadAll:
                                break;
                            default:
                                break;
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
                                {outStatus}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
const processMessageReadStatus = (userId, listMembers, message, messageStatusItemList = []) => {
    let status = EMessageReadStatus.Undefine;
    //Mảng ds những người đã đọc tin nhắn hiện tại (trừ người gửi)
    let readUsers = messageStatusItemList.filter((j) => {
        return message.createdDate <= j.readTime && j.userId != message.createdBy;
    });

    //Mảng ds những người có tin nhắn đã đọc mới nhất == tin nhắn hiện tại (trừ người gửi)
    let lastReadExceptSender = [];
    lastReadExceptSender = messageStatusItemList.filter(
        (j) => j.chatMessageId == message.id && j.userId != message.createdBy
    );
    if (lastReadExceptSender.length == 1) {
        //Render avatar -- chỉ render 1 avatar
        //=> nếu trên 2 người đã đọc(trừ người gửi) thì ko vào case này- để hiện thì 1 avatar kế bên tin nhắn
        status = EMessageReadStatus.ReadOne;
    } else if (
        readUsers.length == listMembers.length - 1 &&
        lastReadExceptSender.length != listMembers.length - 1
    ) {
        //Đã đọc hết và tin nhắn đọc cuối != tin nhắn hiện tại => Không hiện gì
        status = EMessageReadStatus.ReadAll;
    } else if (
        readUsers.length == listMembers.length - 1 &&
        lastReadExceptSender.length == listMembers.length - 1
    ) {
        //Đã đọc hết và tin nhắn đọc cuối == tin nhắn hiện tại => Hiện tất cả những người đã đọc
        status = EMessageReadStatus.ReadAllLast;
    } else if (readUsers.length >= 1 && lastReadExceptSender.length <= readUsers.length) {
        //Vài người đã đọc, vài người chưa đọc
        status = EMessageReadStatus.ReadSome;
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
