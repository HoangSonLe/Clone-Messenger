import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer, IconButton } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import images from "../../assets/img";
import { defaultOnClick } from "../../generals/defaultActions";
import helper from "../../generals/helper";
import DefaultMessageContent from "../DefaultMessageContent/DefaultMessageContent";
import AvatarCustom from "../ui-kit/Avatar/AvatarCustom";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import styles from "./MessageContent.module.scss";
import MessageContentHeader from "./MessageContentHeader";
import MessageList from "./MessageList.jsx/MessageList";

const cx = classNames.bind(styles);
const styleIcon = {
    background: helper.getColorFromName("webWash"),
};
const maxWidthDrawer = 380;
const minWidthDrawer = 250;
const widthDrawer = 255;
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
                            marginRight: -widthDrawer,
                            transition: "margin ease-in-out 200ms",
                            ...(isOpenDrawer && {
                                marginRight: 0,
                                transition: "margin ease-in-out 200ms",
                            }),
                        }}
                    >
                        <MessageContentHeader
                            title={"Hoang Huy"}
                            href={"/"}
                            isOpenDrawer
                            handleToggleDrawer={handleToggleDrawer}
                        />
                        <div className={cx("content")}>
                            <div className={cx("message")}>
                                <MessageList />
                            </div>
                            <div className={cx("input")}>Input</div>
                        </div>
                    </div>
                    <Drawer
                        sx={{
                            width: widthDrawer,
                            flexShrink: 1,
                            "& .MuiDrawer-paper": {
                                width: widthDrawer,
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
                                <Link to={"/"} target="_blank">
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
