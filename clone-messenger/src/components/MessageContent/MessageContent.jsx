import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PendingIcon from "@mui/icons-material/Pending";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Drawer, IconButton } from "@mui/material";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import styles from "./MessageContent.module.scss";

import { useState } from "react";
import images from "../../assets/img";
import { defaultOnClick } from "../../generals/defaultActions";
import DefaultMessageContent from "../DefaultMessageContent/DefaultMessageContent";
import AvatarCustom, { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import helper from "../../generals/helper";

const cx = classNames.bind(styles);
const styleIcon = {
    background: helper.getColorFromName("webWash"),
};
const maxWidthDrawer = 380;
const minWidthDrawer = 250;
export default function MessageContent() {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    let { id } = useParams();
    const handleToggleDrawer = () => {
        setOpenDrawer((prev) => !prev);
    };

    return (
        <>
            {id ? (
                <div className={cx("wrapper")}>
                    <div
                        className={cx("wrapper-message")}
                        style={{
                            marginRight: -maxWidthDrawer,
                            transition: "margin ease-in-out 200ms",
                            ...(isOpenDrawer && {
                                marginRight: 0,
                                transition: "margin ease-in-out 200ms",
                            }),
                        }}
                    >
                        <div className={cx("header")}>
                            <AvatarWithName title="HoangHuy" />
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
                        <div className={cx("content")}>
                            <div className={cx("message")}>Input</div>
                            <div className={cx("input")}>Input</div>
                        </div>
                    </div>
                    <Drawer
                        sx={{
                            width: maxWidthDrawer,
                            flexShrink: 1,
                            "& .MuiDrawer-paper": {
                                width: maxWidthDrawer,
                            },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={isOpenDrawer}
                    >
                        <div className={cx("message-more-wrapper")}>
                            <div className={cx("avatar")}>
                                <AvatarCustom
                                    height={72}
                                    width={72}
                                    srcList={[images.defaultAvatar]}
                                    styleWrapper={{ cursor: "default" }}
                                />
                            </div>
                            <EllipsisContent component={"div"}>
                                <Link to={`/`}>
                                    <div className={cx("name")}>Hoang Huy</div>
                                </Link>
                            </EllipsisContent>
                            <div className={cx("action")}>
                                <div className={cx("icon")}>
                                    <IconButton
                                        sx={styleIcon}
                                        onClick={defaultOnClick}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </div>
                                <div className={cx("icon")}>
                                    <IconButton
                                        sx={styleIcon}
                                        onClick={defaultOnClick}
                                    >
                                        <NotificationsIcon />
                                    </IconButton>
                                </div>
                                <div className={cx("icon")}>
                                    <IconButton
                                        sx={styleIcon}
                                        onClick={defaultOnClick}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className={cx("menu")}></div>
                        </div>
                    </Drawer>
                </div>
            ) : (
                <DefaultMessageContent />
            )}
        </>
    );
}
