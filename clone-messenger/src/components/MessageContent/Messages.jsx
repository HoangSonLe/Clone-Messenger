import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import chatMessageApi from "../../api/chatMessageApi";
import { loadMoreMessage } from "../../features/MessageSlice";
import helper from "../../generals/helper";
import ScrollLoadMore from "../ui-kit/Scroll/SrollLoadMore";
import styles from "./MessageContent.module.scss";
import MessageInput from "./MessageInput/MessageInput";
import MessageList from "./MessageList.jsx/MessageList";
const cx = classNames.bind(styles);
export default function Messages() {
    const childRef = useRef();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const { conversation } = useSelector((state) => state.message);
    const { chatMessagePaginationModel } = useSelector((state) => state.pageDefault);

    const setAutoScrollBottom = () => {
        childRef.current.scrollToBottom();
    };

    const _fetchGetMessageList = async () => {
        if (conversation.groupMessageListByTime.hasMore) {
            try {
                let postData = {
                    ...chatMessagePaginationModel,
                    skip: conversation.groupMessageListByTime.skip,
                    chatGroupId: conversation.id,
                };
                let response = await chatMessageApi.getMessages(postData);
                if (response.isSuccess == true) {
                    dispatch(loadMoreMessage(response.data));
                }
                setLoading(false);
            } catch (err) {
                console.log("err", err);
            }
        } else {
            setLoading(false);
        }
    };
    const onScrollTop = () => {
        setLoading(true);
        _fetchGetMessageList();
    };

    return (
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
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                // height: "100%",
                            }}
                        >
                            <CircularProgress
                                sx={{
                                    color: helper.getColorFromName("disabledIcon"),
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
    );
}
