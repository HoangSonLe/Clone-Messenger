import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fab, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";

import chatGroupApi from "../../api/chatGroupApi";
import { defaultAvatar } from "../../assets/img";
import { initConversation } from "../../features/MessageSlice";
import helper from "../../generals/helper";
import { MessageItemMenu } from "../../const/MenuData";
import AvatarCustom, { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import MenuPopover from "../ui-kit/Menu/MenuPopover";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import styles from "./ConversationItem.module.scss";
import { processMessageReadStatus } from "../MessageContent/Message/Message";
import { EMessageReadStatus } from "../../const/enum";
import MessageStatus from "../MessageContent/Message/MessageStatus";
import { removeGroup } from "../../features/ChatGroupSlice";
import chatMessageApi from "../../api/chatMessageApi";
const cx = classNames.bind(styles);
const styleAction = {
    height: 32,
    width: 35,
    backgroundColor: helper.getColorFromName("background"),
    "&:hover": {
        backgroundColor: helper.getColorFromName("webWash"),
    },
    "&> .MuiSvgIcon-root": {
        color: helper.getColorFromName("placeholderIcon"),
    },
};
function ConversationItem({ data, isLoading }) {
    const dispatch = useDispatch();
    const { currentUserId } = useSelector((state) => state.auth);
    const [isDisplayButton, setDisplayButton] = useState("false");
    const { conversation } = useSelector((state) => state.message);
    const { lastConversationId } = useSelector((state) => state.chatGroup);
    const { defaultModel } = useSelector((state) => state.pageDefault);
    const isActive = data && conversation?.id == data?.id;
    const isTmp = data && data.isTmp == true;
    const _fetchGetConversation = async (callback) => {
        try {
            let id = lastConversationId ?? data?.id;
            if (!id || id == "00000000-0000-0000-0000-000000000000") {
                typeof callback == "function" && callback();
                dispatch(initConversation(null));
            } else {
                let post = {
                    ...defaultModel.chatMessagePaginationModel,
                    hasMore: true,
                    chatGroupId: id,
                };
                let response = await chatGroupApi.getChatGroupDetail(post);
                if (response.isSuccess == true) {
                    typeof callback == "function" && callback();
                    dispatch(initConversation(response.data));
                }
            }
        } catch (err) {
            console.log("err", err);
        }
    };
    const _fetchGetTmpConversation = async () => {
        try {
            let memberIds = data.listMembers.map((i) => i.id);
            let response = await chatMessageApi.searchChatGroup(memberIds);
            if (response.isSuccess == true) {
                dispatch(initConversation(response.data));
            }
        } catch (err) {
            console.log("err", err);
        }
    };
    const onClickGetConversation = () => {
        if (isTmp) _fetchGetTmpConversation();
        else _fetchGetConversation();
    };
    const removeConversation = () => {
        _fetchGetConversation(() => dispatch(removeGroup(data)));
    };
    let process = null;
    let inlineStatus = null;
    if (!isLoading && data && !isTmp && data.lastMessage) {
        process = processMessageReadStatus(
            currentUserId,
            data.listMembers,
            data.lastMessage,
            data.messageStatus?.messageStatusItemList
        );

        if (process.status == EMessageReadStatus.ReadOne) {
            //Render avatar -- chỉ render 1 avatar
            //=> nếu trên 2 người đã đọc -- trừ người gửi thì ko vào case này
            inlineStatus = <AvatarCustom height={14} width={14} />;
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
            if (data.lastMessage.createdBy != currentUserId) {
                inlineStatus = (
                    <div
                        style={{
                            height: 10,
                            width: 10,
                            backgroundColor: helper.getColorFromName("blue"),
                            borderRadius: "50%",
                        }}
                    ></div>
                );
            } else {
                inlineStatus = <MessageStatus status={data.lastMessage.messageStatus} />;
            }
        }
    }
    let imageSrcList = data?.listMembers
        .filter((i) => i.userId != currentUserId)
        .map((i) => i.avatarFileSrc);
    return (
        <div className={cx("container", isActive ? "active" : undefined)}>
            {isLoading ? (
                <>
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className={cx("more")} style={{ paddingLeft: 10 }}>
                        <Skeleton variant="text" sx={{ fontSize: "12px" }} />
                        <Skeleton variant="rounded" width={270} height={50} />
                    </div>
                </>
            ) : (
                <>
                    <div className={cx("wrapper")} onClick={onClickGetConversation}>
                        <AvatarWithName
                            title={data.name}
                            isActive={isActive && isTmp == false}
                            isBoldTitle={true && isTmp == false}
                            isOnline={
                                isTmp == false &&
                                data.listMembers.some(
                                    (i) => i.isOnline == true && i.userId != currentUserId
                                )
                            }
                            srcList={isTmp == true ? [defaultAvatar] : imageSrcList}
                            height="48px"
                            width="48px"
                        >
                            <div style={{ height: "8px" }}></div>
                            {isTmp == true ? null : data.lastMessage ? (
                                <div className={cx("message")}>
                                    <EllipsisContent component="div">
                                        <div>{`${data.lastMessage.createdByName}: ${data.lastMessage.text}`}</div>
                                    </EllipsisContent>

                                    <div className={cx("dot-space")}>.</div>
                                    <div className={cx("time")}>
                                        {helper.timeNotification(data.createdDate)}
                                    </div>
                                </div>
                            ) : null}
                        </AvatarWithName>
                        <div className={cx("more")}>{inlineStatus}</div>
                    </div>
                    {isTmp ? (
                        <div
                            className={cx("action-button-icon")}
                            onClick={(e) => {
                                e.preventDefault();
                                removeConversation();
                            }}
                        >
                            <ClearIcon />
                        </div>
                    ) : (
                        <div
                            className={cx(
                                "action-button",
                                !isDisplayButton ? "visible" : "invisible"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                setDisplayButton((prev) => !prev);
                            }}
                        >
                            <MenuPopover
                                onCloseCallback={setDisplayButton}
                                options={MessageItemMenu(data)}
                            >
                                <Fab sx={styleAction}>
                                    <MoreHorizIcon fontSize="medium" />
                                </Fab>
                            </MenuPopover>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default memo(ConversationItem);
