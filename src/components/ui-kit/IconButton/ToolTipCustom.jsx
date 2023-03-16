import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import * as React from "react";

import helper from "../../../generals/helper";
const StyledTooltip = styled(({ className, arrow, ...props }) => (
    <Tooltip {...props} arrow={arrow} classes={{ popper: className }} />
))(
    ({
        backgroundColor = helper.getColorFromName("toolTipPrimaryBackground"),
    }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: backgroundColor,
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: backgroundColor,
            color: helper.getColorFromName("gray2Text"),
            boxShadow: `0 2px 4px 0 ${helper.getColorFromName("shadow5")}`,
            fontSize: ".8125rem",
            padding: "12px",
        },
    })
);

export default function ToolTipCustom({ children, ...otherProps }) {
    return <StyledTooltip {...otherProps}>{children}</StyledTooltip>;
}
