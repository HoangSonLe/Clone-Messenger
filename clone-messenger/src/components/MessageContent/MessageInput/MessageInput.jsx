import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoodIcon from "@mui/icons-material/Mood";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import chatMessageApi from "../../../api/chatMessageApi";
import { FileInputIcon, GifInputIcon, StickerInputIcon } from "../../../assets/Icons";
import helper from "../../../generals/helper";
import IconButtonCustom from "../../ui-kit/IconButton/IconButtonCustom";
import styles from "./MessageInput.module.scss";

const cx = classNames.bind(styles);
const styleIcon = {
    color: helper.getColorFromName("blue"),
    padding: "4px",
};
function MessageInput({ isRemoveFromChatGroup, setAutoScrollBottom }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const { conversation } = useSelector((state) => state.message);
    const { messagePostData } = useSelector((state) => state.pageDefault);
    const textAreaRef = useRef();
    const resizeTextArea = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };
    useEffect(resizeTextArea, [text]);
    useEffect(() => {
        textAreaRef.current.focus();
    }, []);
    //Hàm check và set màu cho button gửi
    const checkEnableSendButton = () => {
        if (helper.isValidSearchString(text) || files?.length > 0) {
            return true;
        }
        return false;
    };
    const checkCanSend = checkEnableSendButton();
    //Send Message in exist chat group
    const _sendMessage = async (data) => {
        try {
            let response = await chatMessageApi.sendMessage(data);
            if (response) {
                setText("");
            }
            setAutoScrollBottom();
        } catch (err) {
            console.log("err", err);
        }
    };
    //Send message and create new chat group
    const _sendMessageAndCreateConversation = async (data) => {
        try {
            let response = await chatMessageApi.sendMessageWithCreateConversation(data);
            if (response) {
                setText("");
            }
            setAutoScrollBottom();
        } catch (err) {
            console.log("err", err);
        }
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (conversation.isTmp) {
            let postData = {
                userIds: conversation.listMembers.map((i) => i.userId),
                text: text,
            };
            _sendMessageAndCreateConversation(postData);
        } else {
            let postData = {
                ...messagePostData,
                groupId: conversation.id,
                text: text,
            };
            if (checkCanSend) {
                _sendMessage(postData);
            }
        }
    };
    //Handle change text
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmitForm(event);
        }
    };

    //Hàm click file để download
    const downloadFile = (i) => {
        window.open(i.downloadUrl, "_self");
    };

    //Hàm xóa file khỏi những file chọn để gửi
    const handleDeleteFile = (file) => {
        setFiles(files.filter((i) => i !== file));
    };

    const handleUploadFile = () => {
        alert("TODO");
    };

    return (
        <div className={cx("wrapper")}>
            {/* {files?.length > 0 ? (
                <div
                    display="flex"
                    height="16rem"
                    alignItems="center"
                    margin={[, "xs", , "xs"]}
                    boxSizing="border-box"
                    className={classes.fileContainer}
                >
                    {defaultChatMessage.files.map((i) => {
                        return (
                            <div key={i.id} width="25rem" margin={[, "lg1", ,]}>
                                <Tag
                                    title={i.name}
                                    label={
                                        <div
                                            width="17.5rem"
                                            className={
                                                classes.fileNameContainer
                                            }
                                        >
                                            {i.name}
                                        </div>
                                    }
                                    onClick={() => this._onClickFile(i)}
                                    onDelete={() =>
                                        this._onDeleteFile(
                                            defaultChatMessage.files,
                                            i
                                        )
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            ) : null} */}
            {isRemoveFromChatGroup ? (
                <div className={cx("leave-wrapper")}>
                    <div className={cx("title-leave")}>You can't message this group</div>
                    <div className={cx("content-leave")}>
                        You're no longer in this group and can't send or receive calls or messages
                        unless you are added back to it.
                    </div>
                </div>
            ) : (
                // <form onSubmit={onSubmitForm}>
                <div className={cx("wrapper-input")}>
                    <IconButtonCustom
                        sx={{
                            ...styleIcon,
                            marginLeft: "8px",
                        }}
                        title="Open more actions"
                    >
                        <AddCircleIcon />
                    </IconButtonCustom>
                    <div className={cx("inputs")}>
                        <div className={cx("wrapper-actions")}>
                            <div className={cx("actions")}>
                                <IconButtonCustom sx={styleIcon} title="Attach a file">
                                    <FileInputIcon />
                                </IconButtonCustom>
                                <IconButtonCustom sx={styleIcon} title="Choose a ticker">
                                    <StickerInputIcon />
                                </IconButtonCustom>
                                <IconButtonCustom sx={styleIcon} title="Choose a gift">
                                    <GifInputIcon />
                                </IconButtonCustom>
                            </div>
                        </div>
                        <div className={cx("input-wrapper")}>
                            <div className={cx("input")}>
                                <textarea
                                    ref={textAreaRef}
                                    autoFocus
                                    placeholder="Aa"
                                    value={text}
                                    rows={1}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <IconButtonCustom sx={styleIcon} title="Choose a emoji">
                                <MoodIcon />
                            </IconButtonCustom>
                        </div>
                    </div>

                    <IconButtonCustom
                        title={checkCanSend ? "Press enter to send" : "Send a like"}
                        sx={{
                            ...styleIcon,
                            paddingLeft: "8px",
                            paddingRight: "8px",
                        }}
                        onClick={onSubmitForm}
                    >
                        {checkCanSend ? <SendSharpIcon /> : <ThumbUpAltIcon />}
                    </IconButtonCustom>
                </div>
                // </form>
            )}
        </div>
    );
}
MessageInput.defaultProps = {
    isRemoveFromChatGroup: false,
};
export default MessageInput;
// export default withStyles({
//     title: {
//         whiteSpace: "nowrap",
//         textOverflow: "ellipsis",
//         overflow: "hidden",
//     },
//     fileContainer: {
//         overflowX: "auto",
//     },
//     fileNameContainer: {
//         textOverflow: "ellipsis",
//         whiteSpace: "nowrap",
//         overflow: "hidden",
//     },
//     inputContainer: {
//         boxShadow: "0px -2px 5px #00000029",
//     },
// })(MessageInput);
