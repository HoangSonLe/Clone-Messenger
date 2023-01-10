import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import chatMessageApi from "../../api/chatMessageApi";
import { loadMoreMessage } from "../../features/MessageSlice";
import helper from "../../generals/helper";
import { mediaWidthBreakpoint2 } from "../GlobalStyles/colors";
import ScrollLoadMore from "../ui-kit/Scroll/SrollLoadMore";
import DefaultMessageContent from "./DefaultMessageContent/DefaultMessageContent";
import DrawerInfor from "./DrawerInfor";
import styles from "./MessageContent.module.scss";
import MessageContentHeader from "./MessageContentHeader";
import MessageInput from "./MessageInput/MessageInput";
import MessageList from "./MessageList.jsx/MessageList";
const cx = classNames.bind(styles);
const maxWidthDrawer = 300;
const minWidthDrawer = 250;
const widthDrawerDefault = 255;
export default function MessageContent() {
    const childRef = useRef();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const { conversation } = useSelector((state) => state.message);
    const { chatMessagePaginationModel } = useSelector((state) => state.pageDefault);
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
            needWidth !== widthDrawer && setWidthDrawer(needWidth);
        }
    };
    const setAutoScrollBottom = () => {
        childRef.current.scrollToBottom();
    };
    //Add and remove event resize of window
    useEffect(() => {
        window.addEventListener("resize", handleWidthViewChange);
        return () => {
            window.removeEventListener("resize", handleWidthViewChange);
        };
    }, [widthDrawer]);
    const _fetchReadLastMessage = async () => {
        try {
            await chatMessageApi.readLastMessage({ chatGroupId: conversation.id });
        } catch (err) {
            console.log("err", err);
        }
    };
    const readLastMessage = _.debounce(() => {
        _fetchReadLastMessage();
    }, 200);
    const _fetchGetMessageList = async () => {
        if (conversation.groupMessageListByTime.hasMore) {
            try {
                let postData = {
                    ...chatMessagePaginationModel,
                    skip: conversation.groupMessageListByTime.skip,
                    chatGroupId: conversation.id,
                };
                let response = await chatMessageApi.getMessages(postData);
                if (response) {
                    dispatch(loadMoreMessage(response.data));
                }
                setLoading(false);
            } catch (err) {
                console.log("err", err);
            }
        }
    };
    const onScrollTop = () => {
        setLoading(true);
        _fetchGetMessageList();
    };

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
                        <MessageContentHeader
                            title={conversation.name}
                            href={"/"}
                            isOpenDrawer
                            handleToggleDrawer={handleToggleDrawer}
                        />
                        {/* Header */}
                        {/* Messages */}
                        <div className={cx("content")}>
                            <div className={cx("message")}>
                                <ScrollLoadMore
                                    ref={childRef}
                                    // spaceToTop={100}
                                    beginBottom={true}
                                    onScrollTop={onScrollTop}
                                    spaceToBottomDisplayButtonScroll={10}
                                >
                                    {isLoading ? (
                                        <div
                                            style={{
                                                textAlign: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <CircularProgress
                                                sx={{
                                                    color: helper.getColorFromName(
                                                        "placeholderIcon"
                                                    ),
                                                }}
                                                size={25}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ height: "10px" }}></div>
                                    )}
                                    <MessageList />
                                </ScrollLoadMore>
                            </div>
                            <div className={cx("input")}>
                                <MessageInput
                                    setAutoScrollBottom={setAutoScrollBottom}
                                    isRemoveFromChatGroup={conversation.isRemoved}
                                />
                            </div>
                        </div>
                        {/* Messages */}
                    </div>
                    {/* Drawer more information */}
                    <DrawerInfor
                        open={isOpenDrawer}
                        name={conversation.name}
                        isGroup={conversation.isGroup}
                        widthDrawer={widthDrawer}
                        isOpenDrawer={isOpenDrawer}
                    />
                </div>
            ) : (
                <DefaultMessageContent />
            )}
        </>
    );
}
