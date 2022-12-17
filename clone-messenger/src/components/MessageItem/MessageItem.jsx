import { Fab } from "@mui/material";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { configRoutes } from "../../routes/routes";
import GroupAvatarCustom from "../ui-kit/Avatar/GroupAvatarCustom";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import styles from "./MessageItem.module.scss";
import helper from "../../generals/helper";
const cx = classNames.bind(styles);
const styleAction = {
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
                <div className={cx("container")}>
                    <div
                        className={cx(
                            "wrapper",
                            isActive ? "active" : undefined
                        )}
                    >
                        <div className={cx("avatar")}>
                            <GroupAvatarCustom
                                smallStyles={{ width: 32, height: 32 }}
                            />
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
                    <div
                        className={cx("action-button")}
                        onClick={(e) => {
                            e.preventDefault();
                            alert("menu");
                        }}
                    >
                        <Fab sx={styleAction} size="small" aria-label="add">
                            <MoreHorizIcon />
                        </Fab>
                    </div>
                </div>
            )}
        </NavLink>
    );
}
