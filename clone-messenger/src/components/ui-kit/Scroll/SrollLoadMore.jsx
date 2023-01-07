import classNames from "classnames/bind";
import _ from "lodash";
import { forwardRef, useEffect } from "react";
import { useRef } from "react";

import styles from "./ScrollLoadMore.scss";
const cx = classNames.bind(styles);
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
        ...otherProps
    } = props;
    const refDiv = useRef();
    const _onScrollDebounce = _.debounce((scrollTop, offsetHeight, scrollHeight) => {
        // console.log(
        //     "scroll",
        //     scrollTop,
        //     offsetHeight,
        //     spaceToBottom,
        //     scrollHeight,
        //     scrollTop + offsetHeight + spaceToBottom
        // );
        typeof onScroll === "function" && onScroll();
        typeof onScrollTop === "function" && scrollTop - spaceToTop <= 0 && onScrollTop();
        typeof onScrollBottom === "function" &&
            scrollTop + offsetHeight + spaceToBottom >= scrollHeight &&
            onScrollBottom();
    }, debounce);
    const _onScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const offsetHeight = e.target.offsetHeight;
        _onScrollDebounce(scrollTop, offsetHeight, scrollHeight);
    };
    const _scrollToBottom = () => {
        if (beginBottom) {
            refDiv.current.scrollIntoView({
                // behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    };
    useEffect(() => {
        _scrollToBottom();
    }, []);
    return (
        <div
            ref={ref}
            className={cx("scroll", hideScroll ? "hideScroll" : undefined)}
            onScroll={_onScroll}
            {...otherProps}
        >
            {children}
            <div ref={refDiv}></div>
        </div>
    );
});
ScrollLoadMore.defaultProps = {
    debounce: 200,
    spaceToBottom: 0,
    spaceToTop: 0,
};
export default ScrollLoadMore;
