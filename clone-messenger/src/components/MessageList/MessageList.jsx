import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import Header from "../Layouts/Header/Header";
import MessageItem from "../MessageItem/MessageItem";
import Search from "../ui-kit/Search/Search";
const mockData = {
    id: 1,
    name: "Chat Name Chat Name Chat NameChat NameChat Name Chat NameChat NameChat NameChat NameChat NameChat Name",
    isActive: true,
    lastMessage: "You left the group.",
    avatar: null,
    time: "5y",
};
const cx = classNames.bind(styles);
export default function MessageList() {
    return (
        <>
            <div className={cx("wrapper")}>
                <Header title={"Chats"} />
                <div className={cx("search")}>
                    <Search />
                </div>
                <div className={cx("message-list")}>
                    {[...Array(20).keys()].map((i) => (
                        <MessageItem key={i} data={{ ...mockData, id: i }} />
                    ))}
                </div>
            </div>
        </>
    );
}
