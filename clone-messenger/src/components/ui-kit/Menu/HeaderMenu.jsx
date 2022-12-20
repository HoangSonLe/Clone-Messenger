import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Divider, IconButton, MenuItem } from "@mui/material";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function HeaderMenu({ title, onBack, customStyleMenuItem }) {
    return (
        <>
            <MenuItem
                disableRipple={true}
                sx={{
                    ...customStyleMenuItem,
                    "&:hover": {
                        backgroundColor: "transparent",
                        cursor: "default",
                    },
                }}
            >
                <div className={cx("menu-body")}>
                    <div className={cx("menu-item", {})}>
                        <IconButton onClick={onBack}>
                            <KeyboardBackspaceIcon size="large" />
                        </IconButton>
                        <div className={cx("menu-item-title")}>{title}</div>
                    </div>
                </div>
            </MenuItem>
            <Divider />
        </>
    );
}

HeaderMenu.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default HeaderMenu;
