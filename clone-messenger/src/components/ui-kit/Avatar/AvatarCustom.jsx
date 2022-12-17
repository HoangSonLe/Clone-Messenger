import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import * as React from "react";
import PropTypes from "prop-types";

import images from "../../../assets/img";

const StyledBadge = styled(Badge)(({ theme, top = "28px", left = "20px" }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		top, left,
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
    src: images.defaultAvatar,
    variant: "dot",
};
AvatarCustom.propTypes = {
    styles: PropTypes.object,
    variant: PropTypes.instanceOf(["dot", "standard"]),
};

export default function AvatarCustom({ src, alt, styles, variant }) {
    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={variant}
        >
            <Avatar sx={styles} alt={alt} src={src} />
        </StyledBadge>
    );
}
export { StyledBadge };
