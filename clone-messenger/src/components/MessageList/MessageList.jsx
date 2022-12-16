import classNames from "classnames/bind";

import styles from "./MessageList.module.scss";
import ContentDefaultLayout from "../Layouts/ContentDefaultLayout/ContentDefaultLayout";
import MessageItem from "../MessageItem/MessageItem";
import Search from "../ui-kit/Search/Search";

const cx = classNames.bind(styles);
export default function MessageList() {
    return (
        <>
            <ContentDefaultLayout title={"Chats"}>
                {/* <div className={cx("search")}>
                </div> */}
                <Search />
                
                <MessageItem />
            </ContentDefaultLayout>
        </>
    );
}
