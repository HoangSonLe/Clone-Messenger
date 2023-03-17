import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fab, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { memo, useEffect, useRef, useState } from "react";
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
import { removeGroup, removeTmpGroup } from "../../features/ChatGroupSlice";
import chatMessageApi from "../../api/chatMessageApi";
import { getImageAvatarSrc, toastErrorList } from "../../generals/utils";
import AvatarGroup from "../ui-kit/Avatar/AvatarGroup";
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

    const filterOnlineUserList = () => {
        return data?.listMembers.filter((i) => i.isOnline == true && i.userId != currentUserId);
    };
    const filterImageSrcList = () => {
        return data?.listMembers
            .filter((i) => i.userId != currentUserId)
            .map((i) => i.avatarFileSrc);
    };
    const [imageSrcList, setImageSrcList] = useState(filterImageSrcList());
    const [onlineUserList, setOnlineUserList] = useState(filterOnlineUserList());

    const isActive = data && conversation?.id == data?.id;
    const isTmp = data && data.isTmp == true;
    //Get data conversation
    const _fetchGetConversation = async (callback) => {
        try {
            //Case conversationTmp
            let id = lastConversationId ?? data?.id;
            if (!id || id == "00000000-0000-0000-0000-000000000000") {
                typeof callback == "function" && callback();
                dispatch(initConversation(null));
            } else {
                //Case conversation is existed in database
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
            toastErrorList(err?.response.data);
        }
    };
    //Get data conversation tmp
    const _fetchGetTmpConversation = async () => {
        try {
            let memberIds = data.listMembers.map((i) => i.id);
            let response = await chatMessageApi.searchChatGroup(memberIds);
            if (response.isSuccess == true) {
                dispatch(initConversation(response.data));
            }
        } catch (err) {
            toastErrorList(err?.response.data);
        }
    };
    //
    const onClickGetConversation = () => {
        if (data) {
            if (isTmp) _fetchGetTmpConversation();
            else _fetchGetConversation();
        }
    };
    //
    const removeTmpConversation = () => {
        dispatch(removeTmpGroup());
        if (conversation.isTmp == true) {
            _fetchGetConversation();
        }
    };
    //Handle status message (READ,SENT)
    let process = null;
    let inlineStatus = null;
    if (!isLoading && data && !isTmp && data.lastMessage) {
        process = processMessageReadStatus(
            currentUserId,
            data.listMembers,
            data.lastMessage,
            data.messageStatus?.messageStatusItemList
        );
        switch (process.status) {
            case EMessageReadStatus.ReadOne:
                //Render avatar -- chỉ render 1 avatar
                //=> nếu trên 2 người đã đọc -- trừ người gửi thì ko vào case này
                let item = process.lastReadExceptSender[0];
                let imageSrc = getImageAvatarSrc(data.listMembers, item.userId);
                inlineStatus = <AvatarCustom srcList={[imageSrc]} height={14} width={14} />;

            case EMessageReadStatus.ReadSome:
            case EMessageReadStatus.ReadAllLast:
                if (process.lastReadExceptSender.length > 0) {
                    let tmp = process.lastReadExceptSender.map((j) => {
                        return {
                            ...j,
                            imageSrc: getImageAvatarSrc(data.listMembers, j.userId),
                        };
                    });
                    inlineStatus = (
                        <div className={cx("status-line")}>
                            <AvatarGroup
                                max={3}
                                data={tmp}
                                customRender={(data) => (
                                    <AvatarCustom
                                        key={data.userId}
                                        styleWrapper={{
                                            margin: "0px 0px 0px 2px",
                                        }}
                                        srcList={[data.imageSrc]}
                                        height={14}
                                        width={14}
                                    />
                                )}
                            ></AvatarGroup>
                        </div>
                    );
                }

                break;
            case EMessageReadStatus.Undefine:
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
                break;
            case EMessageReadStatus.ReadAll:
                break;
            default:
                break;
        }
    }
    //Handle fill data image and filter online user
    useEffect(() => {
        setImageSrcList(filterImageSrcList());
        setOnlineUserList(filterOnlineUserList());
    }, [data?.listMembers]);

    return (
        <div
            className={cx("container", isActive ? "active" : undefined)}
            onClick={onClickGetConversation}
        >
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
                    <div className={cx("wrapper")}>
                        <AvatarWithName
                            title={data.name}
                            isActive={isActive && isTmp == false}
                            isBoldTitle={true && isTmp == false}
                            isOnline={isTmp == false && onlineUserList.length > 0}
                            srcList={isTmp == true ? [defaultAvatar] : imageSrcList}
                            height="48px"
                            width="48px"
                        >
                            <div style={{ height: "8px" }}></div>
                            {isTmp == true ? null : data.lastMessage ? (
                                <div className={cx("message")}>
                                    <EllipsisContent
                                        component="div"
                                        text={`${data.lastMessage.createdByName}: ${data.lastMessage.text}`}
                                    ></EllipsisContent>

                                    <div className={cx("dot-space")}>.</div>
                                    <div className={cx("time")}>
                                        {helper.timeNotification(data.lastMessage.createdDate)}
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
                                e.stopPropagation();
                                removeTmpConversation();
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
                                e.stopPropagation();
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
