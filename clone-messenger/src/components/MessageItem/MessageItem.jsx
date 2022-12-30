import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Fab, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import images from "../../assets/img";

import helper from "../../generals/helper";
import { MessageItemMenu } from "../../HardData/MenuData";
import { configRoutes } from "../../routes/routes";
import { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import MenuPopover from "../ui-kit/Menu/MenuPopover";
import EllipsisContent from "../ui-kit/TextEllipsis/EllipsisContent";
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
export default function MessageItem({ data, isLoading }) {
    // createdBy,
    //     createdDate,
    //     id,
    //     isRead,
    //     lastMessage,
    //     lastMessageId,
    //     name,
    return (
        <NavLink
            to={`${configRoutes.defaultMessage}/${data?.id}`}
            style={isLoading ? { pointerEvents: "none" } : null}
        >
            {({ isActive }) => (
                <div
                    className={cx("container", isActive ? "active" : undefined)}
                >
                    {isLoading ? (
                        <>
                            <Skeleton
                                variant="circular"
                                width={48}
                                height={48}
                            />
                            <div
                                className={cx("more")}
                                style={{ paddingLeft: 10 }}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: "12px" }}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={270}
                                    height={50}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx("wrapper")}>
                                <AvatarWithName
                                    title={data.name}
                                    isActive={isActive}
                                    srcList={
                                        data.id % 2 !== 0
                                            ? [images.defaultAvatar]
                                            : [
                                                  images.defaultAvatar,
                                                  images.defaultAvatar,
                                              ]
                                    }
                                    height="48px"
                                    width="48px"
                                >
                                    <div style={{ height: "8px" }}></div>
                                    <div className={cx("message")}>
                                        <EllipsisContent component="div">
                                            <div>
                                                {`${data.lastMessage.text}: ${data.lastMessage.text}`}
                                            </div>
                                        </EllipsisContent>

                                        <div className={cx("dot-space")}>.</div>
                                        <div className={cx("time")}>
                                            {helper.timeNotification(
                                                data.createdDate
                                            )}
                                        </div>
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
                                <MenuPopover options={MessageItemMenu(data)}>
                                    <Fab sx={styleAction}>
                                        <MoreHorizIcon fontSize="medium" />
                                    </Fab>
                                </MenuPopover>
                            </div>
                        </>
                    )}
                </div>
            )}
        </NavLink>
    );
}
