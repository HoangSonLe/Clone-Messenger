import classNames from "classnames/bind";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import VideoCallIcon from "@mui/icons-material/VideoCall";

import styles from "./MessageList.module.scss";
import Header from "../Layouts/Header/Header";
import MessageItem from "../MessageItem/MessageItem";
import Search from "../ui-kit/Search/Search";
import IconButtonCustom from "../ui-kit/IconButton/IconButtonCustom";
import helper from "../../generals/helper";
import { EditIcon } from "../../Icons";
const mockData = {
    id: 1,
    name: "Chat Name Chat Name Chat NameChat NameChat Name Chat NameChat NameChat NameChat NameChat NameChat Name",
    isActive: true,
    lastMessage: "You left the group.",
    avatar: null,
    time: "5y",
};
const cx = classNames.bind(styles);
const styleIcon = {
    color: helper.getColorFromName("primaryText"),
    background: helper.getColorFromName("webWash"),
    marginLeft: "12px",
};
export default function MessageList() {
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
                    {[...Array(10).keys()].map((i, index) => (
                        <MessageItem
                            key={`${i.id}-${index}`}
                            data={{ ...mockData, id: i }}
                        />
                    ))}
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
