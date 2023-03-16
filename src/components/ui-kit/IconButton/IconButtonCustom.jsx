import { IconButton } from "@mui/material";
import { defaultOnClick } from "../../../generals/utils.js";
import ToolTipCustom from "./ToolTipCustom";

export default function IconButtonCustom({
    children,
    title,
    placement,
    onClick = defaultOnClick,
    ...props
}) {
    return (
        <ToolTipCustom placement={placement} arrow title={title}>
            <IconButton onClick={onClick} {...props}>
                {children}
            </IconButton>
        </ToolTipCustom>
    );
}
