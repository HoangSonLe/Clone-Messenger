import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer } from "@mui/material";
import classNames from "classnames/bind";
import { memo } from "react";
import { Link } from "react-router-dom";

import { ConversationMenu } from "../../const/MenuData";
import helper from "../../generals/helper";
import { defaultOnClick } from "../../generals/utils.js";
import AvatarCustom from "../ui-kit/Avatar/AvatarCustom";
import IconButtonCustom from "../ui-kit/IconButton/IconButtonCustom";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
import MenuTreeView from "./ConversationInformation/MenuTreeview";
import styles from "./MessageContent.module.scss";
const cx = classNames.bind(styles);
const styleIcon = {
    background: helper.getColorFromName("webWash"),
};

function DrawerInfor({ name, imageSrcList, widthDrawer, isOpenDrawer }) {
    return (
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
            {/* More information content */}
            <div className={cx("message-more-wrapper")}>
                <div className={cx("avatar")}>
                    <AvatarCustom
                        height={72}
                        width={72}
                        srcList={imageSrcList}
                        styleWrapper={{ cursor: "default" }}
                    />
                </div>
                <EllipsisContent component={"div"}>
                    <Link to={"/"} target="_blank">
                        <div className={cx("name")}>{name}</div>
                    </Link>
                </EllipsisContent>
                <div className={cx("action")}>
                    <div className={cx("icon")}>
                        <IconButtonCustom sx={styleIcon} onClick={defaultOnClick}>
                            <AccountCircleIcon />
                        </IconButtonCustom>
                        <p>Profile</p>
                    </div>
                    <div className={cx("icon")}>
                        <IconButtonCustom sx={styleIcon} onClick={defaultOnClick}>
                            <NotificationsIcon />
                        </IconButtonCustom>
                        <p>Mute</p>
                    </div>
                    <div className={cx("icon")}>
                        <IconButtonCustom sx={styleIcon} onClick={defaultOnClick}>
                            <SearchIcon />
                        </IconButtonCustom>
                        <p>Search</p>
                    </div>
                </div>
                <div className={cx("menu")}>
                    <MenuTreeView data={ConversationMenu} />
                </div>
            </div>
        </Drawer>
    );
}
export default memo(DrawerInfor);
