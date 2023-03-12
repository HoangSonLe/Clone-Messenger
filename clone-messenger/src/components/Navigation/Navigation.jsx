import { Tooltip } from "@mui/material";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { MessageIcon, UserGroupIcon } from "../../assets/Icons";
import { defaultAvatar } from "../../assets/img";
import { AvatarMenu } from "../../const/MenuData";
import { configRoutes } from "../../routes/routes";
import AvatarCustom from "../ui-kit/Avatar/AvatarCustom";
import IconButtonCustom from "../ui-kit/IconButton/IconButtonCustom";
import MenuPopover from "../ui-kit/Menu/MenuPopover";
import Menu from "./Menu/Menu";
import MenuItem from "./MenuItem/MenuItem";
import styles from "./Navigation.module.scss";
const cx = classNames.bind(styles);
export default function Navigation() {
    const { currentUserInfor } = useSelector((state) => state.auth);
    let avatarUrl = currentUserInfor?.avatarSrc ?? defaultAvatar;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("menu")}>
                <Menu>
                    <MenuItem
                        href={configRoutes.message}
                        icon={
                            <IconButtonCustom
                                sx={{ padding: 0 }}
                                title={"Chats"}
                                placement={"right"}
                                onClick={() => {}}
                            >
                                <MessageIcon />
                            </IconButtonCustom>
                        }
                    />
                    <MenuItem
                        href={configRoutes.active}
                        icon={
                            <IconButtonCustom
                                sx={{ padding: 0 }}
                                title={"People"}
                                placement={"right"}
                                onClick={() => {}}
                            >
                                <UserGroupIcon />
                            </IconButtonCustom>
                        }
                    />
                </Menu>

                {/* <MarketPlacesIcon className={cx("icon")}/>
          <RequestIcon className={cx("icon")}/>
          <ArchivedChatsIcon className={cx("icon")}/> */}
            </div>
            <div className={cx("avatar")}>
                <MenuPopover options={AvatarMenu()}>
                    <Tooltip title={currentUserInfor?.displayUserName}>
                        <AvatarCustom srcList={[avatarUrl]} height="36px" width="36px" />
                    </Tooltip>
                </MenuPopover>
            </div>
        </div>
    );
}
