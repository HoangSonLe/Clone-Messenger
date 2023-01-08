import classNames from "classnames/bind";
import _ from "lodash";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useRef } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import styles from "./ScrollLoadMore.scss";
import helper from "../../../generals/helper";
const cx = classNames.bind(styles);
const styleIcon = {
    color: helper.getColorFromName("blue"),

    fontSize: "22px",
};
const ScrollLoadMore = forwardRef((props, ref) => {
    const {
        debounce,
        spaceToBottom,
        spaceToTop,
        onScroll,
        onScrollTop,
        onScrollBottom,
        children,
        beginBottom,
        hideScroll = false,
        spaceToBottomDisplayButtonScroll = 0,
        ...otherProps
    } = props;
    const [showScroll, setShowScroll] = useState(false);
    const refDiv = useRef();
    const _onScrollDebounce = _.debounce((e, scrollTop, offsetHeight, scrollHeight) => {
        typeof onScroll === "function" && onScroll();
        typeof onScrollTop === "function" && scrollTop - spaceToTop <= 0 && onScrollTop();
        typeof onScrollBottom === "function" &&
            scrollTop + offsetHeight + spaceToBottom >= scrollHeight &&
            onScrollBottom();
    }, debounce);
    const _setToggleButtonScroll = (scrollTop, offsetHeight, scrollHeight) => {
        if (offsetHeight + scrollTop + spaceToBottomDisplayButtonScroll < scrollHeight) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };
    const _onScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const offsetHeight = e.target.offsetHeight;
        if (spaceToBottomDisplayButtonScroll > 0) {
            _setToggleButtonScroll(scrollTop, offsetHeight, scrollHeight);
        }
        _onScrollDebounce(e, scrollTop, offsetHeight, scrollHeight);
    };

    const scrollToBottom = () => {
        if (beginBottom) {
            refDiv.current.scrollIntoView({
                behavior: showScroll ? "smooth" : "auto",
                block: "end",
                inline: "nearest",
            });
        }
    };
    useImperativeHandle(ref, () => ({
        scrollToBottom() {
            scrollToBottom();
        },
    }));
    useEffect(() => {
        scrollToBottom();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div
                className={cx("scroll", hideScroll ? "hideScroll" : undefined)}
                onScroll={_onScroll}
                {...otherProps}
            >
                {children}
                <div ref={refDiv}></div>
            </div>

            <div
                onClick={scrollToBottom}
                className={cx("scroll-button", showScroll ? "active" : undefined)}
            >
                <ArrowDownwardIcon sx={styleIcon} />
            </div>
        </div>
    );
});
ScrollLoadMore.defaultProps = {
    debounce: 200,
    spaceToBottom: 0,
    spaceToTop: 0,
};
export default ScrollLoadMore;
