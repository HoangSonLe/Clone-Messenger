import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatGroupApi from "../../api/chatGroupApi";
import { addListGroup, resetState } from "../../features/ChatGroupSlice";
import helper from "../../generals/helper";
import { EditIcon } from "../../assets/Icons";
import Header from "../Layouts/Header/Header";
import ConversationItem from "../ConversationItem/ConversationItem";
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
        try {
            let response = await chatGroupApi.getList({});
            if (response) {
                dispatch(addListGroup(response.data));
            }
            setLoading(false);
        } catch (err) {
            console.log("err", err);
        }
    };
    useEffect(() => {
        dispatch(resetState());
        _fetchGetGroupList();
    }, []);

    const onScrollBottom = () => {
        if (hasMore) {
            setLoading(true);
            _fetchGetGroupList();
        }
    };
    return (
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
                            <ConversationItem key={`${i.id}-${index}`} data={i} />
                        ))}
                        {isLoading ? (
                            <>
                                <ConversationItem isLoading={true} />
                                <ConversationItem isLoading={true} />
                            </>
                        ) : null}
                    </>
                </ScrollLoadMore>
            </div>
            <div className={cx("app")}>
                <div className={cx("app-install")}>
                    <BrowserUpdatedIcon />
                    <p>Install Messenger app</p>
                </div>
            </div>
        </div>
    );
}
