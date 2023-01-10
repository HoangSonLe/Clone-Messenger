import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Divider, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import classNames from "classnames/bind.js";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { defaultOnClick } from "../../../generals/defaultActions";
import helper from "../../../generals/helper";
import HeaderMenu from "./HeaderMenu.jsx";
import styles from "./Menu.module.scss";
const styleMenu = {
    elevation: 0,
    sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        minWidth: "344px",
        borderRadius: "12px",
        "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
};
const customStyleMenuItem = {
    padding: "0px 8px",
    borderRadius: "7px",
};

const cx = classNames.bind(styles);

export default function MenuPopover({ children, options, customRenderItem, onCloseCallback }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItemList, setMenuItemList] = useState([{ data: options }]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Check has function onClick=> No : disable(opacity)
    const checkHasOnClickFunction = (item) => {
        let onClick = item?.onClick && typeof item.onClick === "function";
        let onClickDispatch = item?.onClickDispatch && typeof item.onClickDispatch === "function";
        if (onClick || onClickDispatch) return true;
        return false;
    };
    //Handle popover menu
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl((prev) => {
            return event.currentTarget;
        });
    };
    const handleClose = () => {
        setMenuItemList((prev) => prev.slice(0, 1));
        setAnchorEl(null);
        typeof onCloseCallback === "function" && onCloseCallback();
    };
    // Handle action menu
    const onClickMenuItem = (item, e) => {
        if (item?.onClick && typeof item.onClick === "function") {
            item.onClick(item);
        } else if (item?.onClickDispatch && typeof item.onClickDispatch === "function") {
            dispatch(item.onClickDispatch());
            typeof item.callback && item.callback(navigate);
        } else {
            defaultOnClick(e);
        }
    };
    //Handle render menu item
    const handleBackMenu = () => {
        setMenuItemList((prev) => prev.slice(0, prev.length - 1));
    };

    //Group and sort item chung index để set borderBottom
    const _processData = (item) => {
        // console.log(item);
        // // <Divider sx={{ my: 0.5 }} />
        // let map = item.data.reduce((res, i)=>{
        //     let collection = res.get(i.groupIndex);
        //     collection ? collection.push(i) : res.set(i.groupIndex,[i]);
        // },new Map());
        // return result;
        return item;
    };
    const _renderItem = (item, index) => {
        return (
            <div className={cx("menu-item", {})}>
                <IconButton className={cx("btn-icon")}>{item.icon}</IconButton>
                <div className={cx("menu-item-title")}>{item.title}</div>
                {_checkMenuHasChild(item) && (
                    <ArrowForwardIosIcon
                        fontSize="medium"
                        sx={{
                            color: helper.getColorFromName("placeholderIcon"),
                        }}
                    />
                )}
            </div>
        );
    };
    const body = () => {
        let current = menuItemList[menuItemList.length - 1];
        let itemList = _processData(current.data);
        return (
            <div style={{ padding: "2px 5px" }}>
                {menuItemList.length > 1 && (
                    <HeaderMenu customStyleMenuItem={customStyleMenuItem} title={current.title} onBack={handleBackMenu} />
                )}
                {_renderBody(itemList)}
            </div>
        );
    };
    const _checkMenuHasChild = (item) => item.child;
    const _renderBody = (items) => {
        items?.sort((a, b) => a.groupIndex > b.groupIndex);
        let prevIndex = null;
        return items?.map((item, index) => {
            return (
                <div key={`${item.id}`}>
                    {prevIndex && prevIndex !== item.groupIndex
                        ? (() => {
                              prevIndex = item.groupIndex;
                              return <Divider />;
                          })()
                        : (() => {
                              prevIndex = item.groupIndex;
                              return null;
                          })()}
                    <MenuItem
                        key={item.id}
                        onClick={(e) => {
                            if (_checkMenuHasChild(item)) {
                                setMenuItemList((prev) => [...prev, item.child]);
                            } else {
                                onClickMenuItem(item, e);
                            }
                        }}
                        sx={{
                            ...customStyleMenuItem,
                            opacity: checkHasOnClickFunction(item) ? 1 : 0.5,
                        }}
                    >
                        {
                            <div className={cx("menu-body")}>
                                {typeof customRenderItem == "function"
                                    ? customRenderItem(item, index, handleBackMenu)
                                    : _renderItem(item, index)}
                            </div>
                        }
                    </MenuItem>
                </div>
            );
        });
    };
    return (
        <React.Fragment>
            <div onClick={handleClick}>{children}</div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={styleMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {body()}
            </Menu>
        </React.Fragment>
    );
}
