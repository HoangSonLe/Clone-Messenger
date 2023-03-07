import classNames from "classnames/bind";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import chatMessageApi from "../../api/chatMessageApi";
import helper from "../../generals/helper";
import { mediaWidthBreakpoint2 } from "../GlobalStyles/colors";
import DefaultMessageContent from "./DefaultMessageContent/DefaultMessageContent";
import DrawerInfor from "./DrawerInfor";
import styles from "./MessageContent.module.scss";
import MessageContentHeader from "./MessageContentHeader";
import Messages from "./Messages";
import NewMessage from "./NewMessage/NewMessage";
const cx = classNames.bind(styles);
const maxWidthDrawer = 300;
const minWidthDrawer = 250;
const widthDrawerDefault = 255;
export default function MessageContent() {
    const { conversation } = useSelector((state) => state.message);
    //Check breakpoint responsive drawer
    const breakpointWidth = useMemo(() => helper.getNumberInString(mediaWidthBreakpoint2));
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    //Check width with breakpoint
    const checkWidthView = () => {
        return window.innerWidth > breakpointWidth ? maxWidthDrawer : widthDrawerDefault;
    };
    const [widthDrawer, setWidthDrawer] = useState(checkWidthView);
    //Handle open close drawer
    const handleToggleDrawer = () => {
        setOpenDrawer((prev) => !prev);
        isOpenDrawer && handleWidthViewChange(true);
    };

    //Event when window resize
    const handleWidthViewChange = (force = false) => {
        if (isOpenDrawer || force) {
            let needWidth = checkWidthView();
            needWidth !== widthDrawer && setWidthDrawer(needWidth);
        }
    };
    //Add and remove event resize of window
    useEffect(() => {
        window.addEventListener("resize", handleWidthViewChange);
        return () => {
            window.removeEventListener("resize", handleWidthViewChange);
        };
    }, [widthDrawer]);
    // const _fetchReadLastMessage = async () => {
    //     try {
    //         await chatMessageApi.readLastMessage({ chatGroupId: conversation.id });
    //     } catch (err) {
    //         console.log("err", err);
    //     }
    // };

    // const readLastMessage = _.debounce(() => {
    //     _fetchReadLastMessage();
    // }, 200);
    return (
        <>
            {conversation ? (
                !conversation.isTmp ? (
                    <div className={cx("wrapper")}>
                        <div
                            className={cx("wrapper-message")}
                            style={{
                                marginRight: -widthDrawer,
                                transition: "margin ease-in-out 200ms",
                                ...(isOpenDrawer && {
                                    marginRight: 0,
                                    transition: "margin ease-in-out 200ms",
                                }),
                            }}
                        >
                            {/* Header */}
                            <MessageContentHeader
                                title={conversation.name}
                                href={"/"}
                                isOpenDrawer
                                handleToggleDrawer={handleToggleDrawer}
                            />
                            {/* Header */}
                            {/* Messages */}
                            <Messages />
                            {/* Messages */}
                        </div>
                        {/* Drawer more information */}
                        <DrawerInfor
                            open={isOpenDrawer}
                            name={conversation.name}
                            isGroup={conversation.isGroup}
                            widthDrawer={widthDrawer}
                            isOpenDrawer={isOpenDrawer}
                        />
                    </div>
                ) : (
                    <NewMessage />
                )
            ) : (
                <DefaultMessageContent />
            )}
        </>
    );
}
