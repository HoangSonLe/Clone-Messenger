import { Popover } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import PropTypes from "prop-types";

import styles from "./CustomPopover.module.scss";
const cx = classNames.bind(styles);
function CustomPopover({ renderItem, renderContent, vertical = "bottom", horizontal = "left" }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div className={cx("wrapper")}>
            <div>{renderItem(handleClick)}</div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical,
                    horizontal,
                }}
                sx={{
                    borderRadius: "8px",
                    marginTop: "2px",
                }}
                disableAutoFocus
            >
                {renderContent()}
            </Popover>
        </div>
    );
}
CustomPopover.propTypes = {
    renderContent: PropTypes.func,
    renderItem: PropTypes.func,
    vertical: PropTypes.oneOf(["top", "center", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"]),
};
export default CustomPopover;
