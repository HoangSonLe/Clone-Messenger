import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PendingIcon from "@mui/icons-material/Pending";
import VideocamIcon from "@mui/icons-material/Videocam";
import { IconButton } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./MessageContent.module.scss";

import { defaultOnClick } from "../../generals/defaultActions";
import { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export default function MessageContentHeader({
    title,
    href,
    isOpenDrawer,
    handleToggleDrawer,
}) {
    return (
        <div className={cx("header")}>
            <Link to={href} target="_blank">
                <AvatarWithName title={title} />
            </Link>
            <div className={cx("btn-icon")}>
                <IconButton onClick={defaultOnClick}>
                    <CallIcon size="large" />
                </IconButton>
                <IconButton onClick={defaultOnClick}>
                    <VideocamIcon size="large" />
                </IconButton>
                <IconButton onClick={handleToggleDrawer}>
                    {!isOpenDrawer ? (
                        <MoreHorizIcon size="large" />
                    ) : (
                        <PendingIcon size="large" />
                    )}
                </IconButton>
            </div>
        </div>
    );
}
