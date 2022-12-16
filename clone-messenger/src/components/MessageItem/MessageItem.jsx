import { Avatar } from "@mui/material";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import { configRoutes } from "../../routes/routes";
import images from "../../assets/img";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import styles from "./MessageItem.module.scss";
import BadgeAvatars from "../ui-kit/Avatar/AvatarCustom";
const cx = classNames.bind(styles);
const mockData = {
    id: 1,
    name: "Chat Name Chat Name Chat NameChat NameChat Name Chat NameChat NameChat NameChat NameChat NameChat Name",
    isActive: true,
    lastMessage: "You left the group.",
    avatar: null,
    time: "5y",
};
export default function MessageItem({ data = mockData }) {
    return (
        <NavLink to={`${configRoutes.defaultMessage}/${data.id}`}>
            {({ isActive }) => (
                <div className={cx("wrapper", isActive ? "active" : undefined)}>
                    <div className={cx("avatar")}>
                        <BadgeAvatars/>
                        {/* <Avatar
                            sx={{ width: 48, height: 48 }}
                            alt="Avatar"
                            src={data.avatar ?? images.defaultAvatar}
                        /> */}
                    </div>
                    <div className={cx("content")}>
                        <div
                            className={cx("name", {
                                active: isActive ? "active" : undefined,
                            })}
                        >
                            <EllipsisContent tag={"p"}>
                                {data.name}
                            </EllipsisContent>
                        </div>
                        <div style={{ height: "8px" }}></div>
                        <div className={cx("message")}>
                            <div className={cx("message-content")}>
                                {data.lastMessage}
                            </div>
                            <div className={cx("dot-space")}>.</div>
                            <div className={cx("time")}>{data.time}</div>
                        </div>
                    </div>
                    <div className={cx("more")}></div>
                </div>
            )}
        </NavLink>
    );
}
