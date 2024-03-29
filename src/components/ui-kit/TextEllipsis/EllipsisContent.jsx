import PropTypes from "prop-types";
import React from "react";

function EllipsisContent(props) {
    const { lines, text, ellipsisChars, isBold, ...otherProps } = props;
    let style = {
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        wordBreak: "break-word",
        WebkitLineClamp: lines,
    };
    if (isBold) {
        style = { ...style, fontWeight: "bold" };
    }
    return <div style={style}>{text}</div>;
}
EllipsisContent.defaultProps = {
    lines: 1,
    component: "p",
    debounceTimeoutOnResize: 200,
    ellipsisChars: "...",
};
EllipsisContent.propTypes = {
    lines: PropTypes.number,
    component: PropTypes.elementType,
    debounceTimeoutOnResize: PropTypes.number,
    ellipsisChars: PropTypes.string,
    className: PropTypes.string,
};
export default EllipsisContent;
