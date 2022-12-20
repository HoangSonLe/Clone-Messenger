import classNames from "classnames/bind";
import { MessageIcon, UserGroupIcon } from "../../Icons";
import { AvatarMenu } from "../../mockData/MenuData";
import { configRoutes } from "../../routes/routes";
import AvatarCustom from "../ui-kit/Avatar/AvatarCustom";
import MenuPopover from "../ui-kit/Menu/MenuPopover";
import Menu from "./Menu/Menu";
import MenuItem from "./MenuItem/MenuItem";
import styles from "./Navigation.module.scss";
const cx = classNames.bind(styles);
export default function Navigation() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("menu")}>
                <Menu>
                    <MenuItem
                        href={configRoutes.defaultMessage}
                        icon={<MessageIcon />}
                    />
                    <MenuItem
                        href={configRoutes.active}
                        icon={<UserGroupIcon />}
                    />
                </Menu>

                {/* <MarketPlacesIcon className={cx("icon")}/>
          <RequestIcon className={cx("icon")}/>
          <ArchivedChatsIcon className={cx("icon")}/> */}
            </div>
            <div className={cx("avatar")}>
                <MenuPopover options={AvatarMenu}>
                    <AvatarCustom height="36px" width="36px"/>
                </MenuPopover>
            </div>
        </div>
    );
}
