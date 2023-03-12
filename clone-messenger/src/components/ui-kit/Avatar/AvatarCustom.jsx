import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import * as React from "react";
import styles from "./Avatar.module.scss";

import { forwardRef } from "react";
import { defaultAvatar } from "../../../assets/img";
import helper from "../../../generals/helper";
import EllipsisContent from "../TextEllipsis/EllipsisContent";
import { Tooltip } from "@mui/material";
import { Skeleton } from "@mui/material";
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

const AvatarCustom = forwardRef(
    (
        {
            srcList,
            alt,
            height = 32,
            width = 32,
            groupHeight = 32,
            groupWidth = 32,
            styles,
            isOnline,
            styleWrapper,
            ...props
        },
        ref
    ) => {
        const isGroupAvatar = srcList.length >= 2;
        let heightImage = helper.getNumberInString(isGroupAvatar ? groupHeight : height);
        let widthImage = helper.getNumberInString(isGroupAvatar ? groupWidth : width);
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
        let variant = isOnline ? "dot" : "standard";
        let imageMain = defaultAvatar;
        if (srcList.length > 0 && srcList[0]) {
            imageMain = srcList[0];
        }
        let imageSub = defaultAvatar;
        if (srcList.length > 1 && srcList[1]) {
            imageSub = srcList[1];
        }
        return (
            <StyledBadge
                ref={ref}
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant={variant}
                sx={{
                    cursor: "pointer",
                    ...styleWrapper,
                }}
                {...props}
            >
                <div style={parentStyle}>
                    <Avatar
                        sx={{
                            height: heightImage,
                            width: widthImage,
                            ...styles,
                        }}
                        alt={alt}
                        src={imageMain}
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
                            src={imageSub}
                        />
                    ) : null}
                </div>
            </StyledBadge>
        );
    }
);
AvatarCustom.defaultProps = {
    srcList: [defaultAvatar],
    isOnline: false,
};
AvatarCustom.propTypes = {
    styles: PropTypes.object,
    srcList: PropTypes.array,
    isOnline: PropTypes.bool,
    // variant: PropTypes.oneOf(["dot", "standard"]),
};
export default AvatarCustom;
const AvatarWithName = ({
    data,
    title,
    onClickComponent,
    children,
    isActive,
    isOnline,
    isBoldTitle,
    noneBold,
    srcList = [],
    forceDisplayContent,
    isLoading,
    height,
    width,
    ...otherProps
}) => {
    const WrappedMyComponent = React.forwardRef(function WrappedMyComponent(props, ref) {
        return (
            <EllipsisContent component={"div"}>
                <div
                    className={cx("name", {
                        active: isActive && isBoldTitle,
                        noBold: noneBold,
                    })}
                >
                    {title}
                </div>
            </EllipsisContent>
        );
    });
    if (isLoading) {
        let heightImage = helper.getNumberInString(height);
        let widthImage = helper.getNumberInString(width);
        return (
            <div className={cx("loading")}>
                <Skeleton variant="circular" width={widthImage} height={heightImage} />
                <div className={cx("more")} style={{ paddingLeft: 10 }}>
                    <Skeleton variant="text" width={"50%"} height={20} />
                    <Skeleton variant="rounded" width={"80%"} height={16} />
                </div>
            </div>
        );
    }
    return (
        <div
            className={cx("wrapper", { action: typeof onClickComponent == "function" })}
            onClick={() => {
                typeof onClickComponent == "function" && onClickComponent(data);
            }}
        >
            <div className={cx("avatar")}>
                {/* Lenght of data > 1 => group image */}
                <AvatarCustom
                    width={width}
                    height={height}
                    isOnline={isOnline}
                    srcList={srcList}
                    {...otherProps}
                />
            </div>
            <div className={cx("content", { "force-display-content": forceDisplayContent })}>
                {/* <Tooltip title={title}>WrappedMyComponent */}
                <WrappedMyComponent />
                {/* </Tooltip> */}

                {children}
            </div>
        </div>
    );
};
export { StyledBadge, AvatarWithName };
