import { memo } from "react";
import { Link } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PendingIcon from "@mui/icons-material/Pending";
import VideocamIcon from "@mui/icons-material/Videocam";
import classNames from "classnames/bind";
import styles from "./MessageContent.module.scss";

import { defaultOnClick } from "../../generals/defaultActions";
import { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import IconButtonCustom from "../ui-kit/IconButton/IconButtonCustom";

const cx = classNames.bind(styles);

function MessageContentHeader({ title, href, isOpenDrawer, handleToggleDrawer }) {
    return (
        <div className={cx("header")}>
            <Link to={href} target="_blank">
                <AvatarWithName forceContent={true} title={title} />
            </Link>
            <div className={cx("btn-icon")}>
                <IconButtonCustom title="Start a voice call" onClick={defaultOnClick}>
                    <CallIcon size="large" />
                </IconButtonCustom>
                <IconButtonCustom title={"Start a video call"} onClick={defaultOnClick}>
                    <VideocamIcon size="large" />
                </IconButtonCustom>
                <IconButtonCustom title={"Conversion information"} onClick={handleToggleDrawer}>
                    {!isOpenDrawer ? <MoreHorizIcon size="large" /> : <PendingIcon size="large" />}
                </IconButtonCustom>
            </div>
        </div>
    );
}
export default memo(MessageContentHeader);
