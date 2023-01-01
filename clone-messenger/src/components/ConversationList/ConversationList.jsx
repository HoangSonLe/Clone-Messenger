import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import chatGroupApi from "../../api/chatGroupApi";
import { addListGroup } from "../../features/ChatGroup/ChatGroupSlice";
import { toastError } from "../../generals/defaultActions";
import helper from "../../generals/helper";
import { EditIcon } from "../../Icons";
import Header from "../Layouts/Header/Header";
import MessageItem from "../MessageItem/MessageItem";
import IconButtonCustom from "../ui-kit/IconButton/IconButtonCustom";
import ScrollLoadMore from "../ui-kit/Scroll/SrollLoadMore";
import Search from "../ui-kit/Search/Search";
import styles from "./ConversationList.module.scss";
const cx = classNames.bind(styles);
const styleIcon = {
    color: helper.getColorFromName("primaryText"),
    background: helper.getColorFromName("webWash"),
    marginLeft: "12px",
};
export default function MessageList() {
    const dispatch = useDispatch();
    const { chatGroupList, hasMore } = useSelector((state) => state.chatGroup);
    const [isLoading, setLoading] = useState(true);

    const _fetchGetGroupList = async () => {
        let postData = {};
        await chatGroupApi
            .getList(postData)
            .then((response) => {
                dispatch(addListGroup(response.data));
                setLoading(false);
            })
            .catch((err) => {
                toastError(err);
            });
    };
    useEffect(() => {
        _fetchGetGroupList();
    }, []);

    const onScrollBottom = () => {
        if (hasMore) {
            setLoading(true);
            _fetchGetGroupList();
            setLoading(false);
        }
    };
    return (
        <>
            <div className={cx("wrapper")}>
                <Header title={"Chats"}>
                    <IconButtonCustom sx={styleIcon}>
                        <VideoCallIcon />
                    </IconButtonCustom>
                    <IconButtonCustom sx={styleIcon}>
                        <EditIcon />
                    </IconButtonCustom>
                </Header>
                <div className={cx("search")}>
                    <Search />
                </div>
                <div className={cx("message-list")}>
                    <ScrollLoadMore onScrollBottom={onScrollBottom}>
                        <>
                            {chatGroupList.map((i, index) => (
                                <MessageItem
                                    key={`${i.id}-${index}`}
                                    data={i}
                                />
                            ))}
                            {isLoading ? (
                                <>
                                    <MessageItem isLoading={true} />
                                    <MessageItem isLoading={true} />
                                </>
                            ) : null}
                        </>
                    </ScrollLoadMore>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={true}
                        closeOnClick
                        pauseOnFocusLoss
                        pauseOnHover
                        theme="colored"
                    />
                </div>
                <div className={cx("app")}>
                    <div className={cx("app-install")}>
                        <BrowserUpdatedIcon />
                        <p>Install Messenger app</p>
                    </div>
                </div>
            </div>
        </>
    );
}
