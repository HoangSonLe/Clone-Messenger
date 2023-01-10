import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fab, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import chatGroupApi from "../../api/chatGroupApi";
import { defaultAvatar } from "../../assets/img";
import { initConversation } from "../../features/MessageSlice";
import helper from "../../generals/helper";
import { MessageItemMenu } from "../../const/MenuData";
import { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import MenuPopover from "../ui-kit/Menu/MenuPopover";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import styles from "./MessageItem.module.scss";
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
 function MessageItem({ data, isLoading }) {
    const dispatch = useDispatch();
    const [isDisplayButton, setDisplayButton] = useState("false");
    const { conversation } = useSelector((state) => state.message);
    const { defaultModel } = useSelector((state) => state.pageDefault);
    const isActive = data && conversation?.id == data?.id;
    const _fetchGetConversation = async () => {
        try {
            let post = {
                ...defaultModel.chatMessagePaginationModel,
                hasMore: true,
                chatGroupId: data?.id,
            };
            let response = await chatGroupApi.getChatGroupDetail(post);
            if (response) {
                dispatch(initConversation(response.data));
            }
        } catch (err) {
            console.log("err", err);
        }
    };
    const onClickGetConversation = () => {
        _fetchGetConversation();
    };
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
                            isActive={isActive}
                            srcList={data.id % 2 !== 0 ? [defaultAvatar] : [defaultAvatar, defaultAvatar]}
                            height="48px"
                            width="48px"
                        >
                            <div style={{ height: "8px" }}></div>
                            <div className={cx("message")}>
                                <EllipsisContent component="div">
                                    <div>{`${data.lastMessage.createdByName}: ${data.lastMessage.text}`}</div>
                                </EllipsisContent>

                                <div className={cx("dot-space")}>.</div>
                                <div className={cx("time")}>{helper.timeNotification(data.createdDate)}</div>
                            </div>
                        </AvatarWithName>
                        <div className={cx("more")}></div>
                    </div>
                    <div
                        className={cx("action-button", !isDisplayButton ? "visible" : "invisible")}
                        onClick={(e) => {
                            e.preventDefault();
                            setDisplayButton((prev) => !prev);
                        }}
                    >
                        <MenuPopover onCloseCallback={setDisplayButton} options={MessageItemMenu(data)}>
                            <Fab sx={styleAction}>
                                <MoreHorizIcon fontSize="medium" />
                            </Fab>
                        </MenuPopover>
                    </div>
                </>
            )}
        </div>
    );
}

export default memo(MessageItem)