import classNames from "classnames/bind";
import _ from "lodash";

import styles from "./ScrollLoadMore.scss";
const cx = classNames.bind(styles);
function ScrollLoadMore(props) {
    const {
        debounce,
        spaceToBottom,
        spaceToTop,
        onScroll,
        onScrollTop,
        onScrollBottom,
        children,
        hideScroll = false,
        ...otherProps
    } = props;
    const _onScrollDebounce = _.debounce(
        (scrollTop, offsetHeight, scrollHeight) => {
            // console.log(
            //     "scroll",
            //     scrollTop,
            //     offsetHeight,
            //     spaceToBottom,
            //     scrollHeight,
            //     scrollTop + offsetHeight + spaceToBottom
            // );
            typeof onScroll === "function" && onScroll();
            typeof onScrollTop === "function" &&
                scrollTop - spaceToTop <= 0 &&
                onScrollTop();
            typeof onScrollBottom === "function" &&
                scrollTop + offsetHeight + spaceToBottom >= scrollHeight &&
                onScrollBottom();
        },
        debounce
    );
    const _onScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const offsetHeight = e.target.offsetHeight;
        _onScrollDebounce(scrollTop, offsetHeight, scrollHeight);
    };
    return (
        <div
            {...otherProps}
            className={cx("scroll", hideScroll ? "hideScroll" : undefined)}
            onScroll={_onScroll}
        >
            {children}
        </div>
    );
}
ScrollLoadMore.defaultProps = {
    debounce: 200,
    spaceToBottom: 0,
    spaceToTop: 0,
};
export default ScrollLoadMore;
