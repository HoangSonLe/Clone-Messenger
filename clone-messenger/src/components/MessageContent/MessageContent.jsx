import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, Drawer } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import chatMessageApi from "../../api/chatMessageApi";
import images from "../../assets/img";
import { loadMoreMessage } from "../../features/Messages/MessageSlice";
import { defaultOnClick } from "../../generals/defaultActions";
import helper from "../../generals/helper";
import { ConversationMenu } from "../../HardData/MenuData";
import { mediaWidthBreakpoint2 } from "../GlobalStyles/colors";
import AvatarCustom from "../ui-kit/Avatar/AvatarCustom";
import IconButtonCustom from "../ui-kit/IconButton/IconButtonCustom";
import ScrollLoadMore from "../ui-kit/Scroll/SrollLoadMore";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import MenuTreeView from "./ConversationInformation/MenuTreeview";
import DefaultMessageContent from "./DefaultMessageContent/DefaultMessageContent";
import styles from "./MessageContent.module.scss";
import MessageContentHeader from "./MessageContentHeader";
import MessageInput from "./MessageInput/MessageInput";
import MessageList from "./MessageList.jsx/MessageList";
const cx = classNames.bind(styles);
const styleIcon = {
    background: helper.getColorFromName("webWash"),
};
const maxWidthDrawer = 300;
const minWidthDrawer = 250;
const widthDrawerDefault = 255;
export default function MessageContent() {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const { conversation } = useSelector((state) => state.message);
    const { chatMessagePaginationModel } = useSelector((state) => state.pageDefault);
    const _fetchGetMessageList = async () => {
        if (conversation.groupMessageListByTime.hasMore) {
            try {
                let postData = {
                    ...chatMessagePaginationModel,
                    skip: conversation.groupMessageListByTime.skip,
                    chatGroupId: conversation.id,
                };
                var response = await chatMessageApi.getMessages(postData);
                if (response) {
                    dispatch(loadMoreMessage(response.data));
                }
            } catch (err) {
                console.log("err", err);
            }
        }
    };
    const onScrollTop = () => {
        setLoading(true);
        _fetchGetMessageList();
        setLoading(false);
    };
    //Check breakpoint responsive drawer
    const breakpointWidth = useMemo(() => helper.getNumberInString(mediaWidthBreakpoint2));
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    //Check width with breakpoint
    const checkWidthView = () => {
        return window.innerWidth > breakpointWidth ? maxWidthDrawer : widthDrawerDefault;
    };
    const [widthDrawer, setWidthDrawer] = useState(checkWidthView);
    //Handle open close drawer
    const handleToggleDrawer = () => {
        setOpenDrawer((prev) => !prev);
        isOpenDrawer && handleWidthViewChange(true);
    };

    //Event when window resize
    const handleWidthViewChange = (force = false) => {
        if (isOpenDrawer || force) {
            let needWidth = checkWidthView();
            // console.log(isOpenDrawer, needWidth, widthDrawer);
            needWidth !== widthDrawer && setWidthDrawer(needWidth);
        }
    };
    //Add and remove event resize of window
    useEffect(() => {
        window.addEventListener("resize", handleWidthViewChange);
        return () => {
            window.removeEventListener("resize", handleWidthViewChange);
        };
    }, [widthDrawer]);

    return (
        <>
            {conversation ? (
                <div className={cx("wrapper")}>
                    <div
                        className={cx("wrapper-message")}
                        style={{
                            marginRight: -widthDrawer,
                            transition: "margin ease-in-out 200ms",
                            ...(isOpenDrawer && {
                                marginRight: 0,
                                transition: "margin ease-in-out 200ms",
                            }),
                        }}
                    >
                        {/* Header */}
                        <MessageContentHeader title={conversation.name} href={"/"} isOpenDrawer handleToggleDrawer={handleToggleDrawer} />
                        {/* Header */}
                        {/* Messages */}
                        <div className={cx("content")}>
                            <div className={cx("message")}>
                                <ScrollLoadMore beginBottom={true} onScrollTop={onScrollTop}>
                                    {isLoading ? (
                                        <div
                                            style={{
                                                textAlign: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <CircularProgress
                                                sx={{
                                                    color: helper.getColorFromName("placeholderIcon"),
                                                }}
                                                size={25}
                                            />
                                        </div>
                                    ) : null}
                                    <MessageList />
                                </ScrollLoadMore>
                            </div>
                            <div className={cx("input")}>
                                <MessageInput isRemoveFromChatGroup={conversation.isRemoved} />
                            </div>
                        </div>
                        {/* Messages */}
                    </div>
                    {/* Drawer more information */}
                    <Drawer
                        sx={{
                            width: widthDrawer,
                            flexShrink: 1,
                            "& .MuiDrawer-paper": {
                                width: widthDrawer,
                            },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={isOpenDrawer}
                    >
                        {/* More information content */}
                        <div className={cx("message-more-wrapper")}>
                            <div className={cx("avatar")}>
                                <AvatarCustom
                                    height={72}
                                    width={72}
                                    srcList={conversation.isGroup ? [images.defaultAvatar, images.defaultAvatar] : [images.defaultAvatar]}
                                    styleWrapper={{ cursor: "default" }}
                                />
                            </div>
                            <EllipsisContent component={"div"}>
                                <Link to={"/"} target="_blank">
                                    <div className={cx("name")}>{conversation.name}</div>
                                </Link>
                            </EllipsisContent>
                            <div className={cx("action")}>
                                <div className={cx("icon")}>
                                    <IconButtonCustom sx={styleIcon} onClick={defaultOnClick}>
                                        <AccountCircleIcon />
                                    </IconButtonCustom>
                                    <p>Profile</p>
                                </div>
                                <div className={cx("icon")}>
                                    <IconButtonCustom sx={styleIcon} onClick={defaultOnClick}>
                                        <NotificationsIcon />
                                    </IconButtonCustom>
                                    <p>Mute</p>
                                </div>
                                <div className={cx("icon")}>
                                    <IconButtonCustom sx={styleIcon} onClick={defaultOnClick}>
                                        <SearchIcon />
                                    </IconButtonCustom>
                                    <p>Search</p>
                                </div>
                            </div>
                            <div className={cx("menu")}>
                                <MenuTreeView data={ConversationMenu} />
                            </div>
                        </div>
                    </Drawer>
                </div>
            ) : (
                <DefaultMessageContent />
            )}
        </>
    );
}
