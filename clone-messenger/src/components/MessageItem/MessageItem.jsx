import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fab } from "@mui/material";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import images from "../../assets/img";

import helper from "../../generals/helper";
import { MessageItemMenu } from "../../mockData/MenuData";
import { configRoutes } from "../../routes/routes";
import { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import MenuPopover from "../ui-kit/Menu/MenuPopover";
import styles from "./MessageItem.module.scss";
const cx = classNames.bind(styles);
const styleAction = {
    height: 32,
    width: 35,
    backgroundColor: helper.getColorFromName("background"),
    "&:hover": {
        backgroundColor: helper.getColorFromName("webWash"),
    },
    "&> .MuiSvgIcon-root": {
        color: helper.getColorFromName("placeholderIcon"),
    },
};
export default function MessageItem({ data }) {
    return (
        <NavLink to={`${configRoutes.defaultMessage}/${data.id}`}>
            {({ isActive }) => (
                <div
                    className={cx("container", isActive ? "active" : undefined)}
                >
                    <div className={cx("wrapper")}>
                        <AvatarWithName
                            title={data.name}
                            isActive={isActive}
                            srcList={data.id % 2 !== 0 ? [images.defaultAvatar] : [images.defaultAvatar,images.defaultAvatar]}
                            height= "48px"
                            width = "48px"
                        >
                            <div style={{ height: "8px" }}></div>
                            <div className={cx("message")}>
                                <div className={cx("message-content")}>
                                    {data.lastMessage}
                                </div>
                                <div className={cx("dot-space")}>.</div>
                                <div className={cx("time")}>{data.time}</div>
                            </div>
                        </AvatarWithName>
                        <div className={cx("more")}></div>
                    </div>
                    <div
                        className={cx("action-button")}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <MenuPopover options={MessageItemMenu}>
                            <Fab sx={styleAction}>
                                <MoreHorizIcon fontSize="medium" />
                            </Fab>
                        </MenuPopover>
                    </div>
                </div>
            )}
        </NavLink>
    );
}
