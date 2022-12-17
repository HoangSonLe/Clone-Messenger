import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

import images from "../../../assets/img";
import { StyledBadge } from "./AvatarCustom";
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 32,
    height: 32,
    border: `2px solid ${theme.palette.background.paper}`,
}));

export default function GroupAvatarCustom({
    smallSrc,
    smallAlt,
    smallStyles,
    src,
    alt,
    styles,
    variant,
}) {
    let _styles = {
        width: 32,
        height: 32,
        ...styles,
    };
    return (
        <Stack direction="row" spacing={2}>
            <div></div>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                badgeContent={
                    <SmallAvatar
                        alt={smallAlt}
                        src={smallSrc}
                        sx={smallStyles}
                    />
                }
            >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant={variant}
                >
                    <Avatar sx={_styles} alt={alt} src={src} />
                </StyledBadge>
            </Badge>
        </Stack>
    );
}
GroupAvatarCustom.defaultProps = {
    src: images.defaultAvatar,
    smallSrc: images.defaultAvatar,
    variant: "dot",
};
GroupAvatarCustom.propTypes = {
    styles: PropTypes.object,
    smallStyles: PropTypes.object,
    variant: PropTypes.oneOf(["dot", "standard"]),
};
