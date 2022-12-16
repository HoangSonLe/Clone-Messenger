import PropTypes from "prop-types";
import React from "react";
import TextEllipsis from "react-text-ellipsis";

// const propTypes = {
//   lines: PropTypes.number,
//   component: PropTypes.elementType,
//   debounceTimeoutOnResize: PropTypes.number,
//   ellipsisChars: PropTypes.string,
//   className: PropTypes.string,
// };
function EllipsisContent(props) {
  const {
    lines,
    debounceTimeoutOnResize,
    ellipsisChars,
    className,
    style,
    component,
    children,
    ...otherProps
  } = props;
  return (
    <TextEllipsis
      style={{ ...style }}
      lines={lines}
      tag={component}
      ellipsisChars={ellipsisChars}
      tagClass={className}
      debounceTimeoutOnResize={debounceTimeoutOnResize}
    >
      {children}
    </TextEllipsis>
  );
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
