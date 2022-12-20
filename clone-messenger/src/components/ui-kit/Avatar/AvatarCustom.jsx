import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import * as React from "react";
import styles from "./Avatar.module.scss";

import images from "../../../assets/img";
import EllipsisContent from "../TextEllipsis/EllipsisContent";
import helper from "../../../generals/helper";
const cx = classNames.bind(styles);
const StyledBadge = styled(Badge)(({ theme }) => ({
    // cursor: "pointer",
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        bottom: "10%",
        right: "5%",
    },
    "&::after": {
        position: "absolute",
        top: "-1px",
        left: "-1px",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        // animation: "ripple 1.2s infinite ease-in-out",
        // border: "1px solid currentColor",
        content: '""',
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));
AvatarCustom.defaultProps = {
    srcList: [images.defaultAvatar],
    variant: "dot",
};
AvatarCustom.propTypes = {
    styles: PropTypes.object,
    srcList: PropTypes.array,
    variant: PropTypes.oneOf(["dot", "standard"]),
};

export default function AvatarCustom({
    srcList,
    alt,
    height = 32,
    width = 32,
    groupHeight = 32,
    groupWidth = 32,
    styles,
    variant,
    styleWrapper,
}) {
    const isGroupAvatar = srcList.length >= 2;
    let heightImage = helper.getNumberInString(
        isGroupAvatar ? groupHeight : height
    );
    let widthImage = helper.getNumberInString(
        isGroupAvatar ? groupWidth : width
    );
    let smallImageTop = isGroupAvatar ? heightImage / 2 : 0;
    let smallImageLeft = isGroupAvatar ? widthImage / 2 : 0;
    let heightParent = heightImage + smallImageTop;
    let widthParent = widthImage + smallImageLeft;
    let parentStyle = {
        height: heightParent,
        width: widthParent,
        paddingLeft: `${smallImageLeft}px`,
        boxSizing: "border-box",
    };
    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={variant}
            sx={{
                cursor: "pointer",
                ...styleWrapper,
            }}
        >
            <div style={parentStyle}>
                <Avatar
                    sx={{
                        height: heightImage,
                        width: widthImage,
                        ...styles,
                    }}
                    alt={alt}
                    src={srcList[0]}
                />
                {isGroupAvatar ? (
                    <Avatar
                        sx={{
                            height: heightImage,
                            width: widthImage,
                            boxSizing: "content-box",
                            border: "2px solid white",
                            top: `${-smallImageTop}px`,
                            left: `${-smallImageLeft}px`,
                            ...styles,
                        }}
                        alt={alt}
                        src={srcList[1]}
                    />
                ) : null}
            </div>
        </StyledBadge>
    );
}

const AvatarWithName = ({
    title,
    onClickComponent = () => {},
    children,
    isActive,
    srcList = [],
    ...otherProps
}) => {
    return (
        <div className={cx("wrapper")} onClick={onClickComponent}>
            <div className={cx("avatar")}>
                {/* Lenght of data > 1 => group image */}
                <AvatarCustom srcList={srcList} {...otherProps} />
            </div>
            <div className={cx("content")}>
                <EllipsisContent component={"div"}>
                    <div
                        className={cx("name", {
                            active: isActive ? "active" : undefined,
                        })}
                    >
                        {title}
                    </div>
                </EllipsisContent>
                {children}
            </div>
        </div>
    );
};
export { StyledBadge, AvatarWithName };
