import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { defaultOnClick } from "../../../generals/utils.js";
import helper from "../../../generals/helper";

function StyledTreeItem(props) {
    const {
        bgColor,
        color = helper.getColorFromName("primaryText"),
        labelIcon: LabelIcon,
        labelIconColor,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <TreeItem
            sx={{
                "& .MuiTreeItem-content": {
                    color: helper.getColorFromName("primaryText"),
                    padding: "0px 8px",
                    fontWeight: helper.getFontWeightFromName("600"),
                    flexDirection: "row-reverse",
                    fontSize: ".9375rem",
                    borderRadius: "4px",
                    "&.Mui-expanded": {
                        flexDirection: "row-reverse",
                    },
                    "& .MuiTreeItem-iconContainer": {
                        margin: 0,
                        padding: "8px",
                        width: "fit-content",
                    },
                    "&:hover": {
                        backgroundColor: helper.getColorFromName("webWash"),
                        borderRadius: "8px",
                    },
                    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused":
                        {
                            backgroundColor: `var(--tree-view-bg-color)`,
                            color: "var(--tree-view-color)",
                            borderRadius: "4px",
                        },
                    "& .MuiTreeItem-label": {
                        fontWeight: "inherit",
                        color: "inherit",
                        padding: "12px 8px",
                        "& .MuiBox-root": {
                            padding: 0,
                            "& svg": {
                                color: labelIconColor,
                                height: "24px",
                                width: "24px",
                            },
                        },
                    },
                },
                "& .MuiTreeItem-group": {
                    marginLeft: 0,
                    "& .MuiTreeItem-content": {
                        "& .MuiTreeItem-label": {
                            paddingLeft: "20px",
                        },
                    },
                },
            }}
            label={
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 0.5,
                        pr: 0,
                    }}
                >
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "inherit", flexGrow: 1 }}
                    >
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            // style={{
            //     "--tree-view-color": color,
            //     "--tree-view-bg-color": bgColor,
            // }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    nodeId: PropTypes.string,
    labelIcon: PropTypes.elementType,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

export default function MenuTreeView({ data = [] }) {
    const styleIcon = {
        height: "30px",
        width: "30px",
    };
    return (
        <TreeView
            aria-label="gmail"
            defaultCollapseIcon={<ExpandMoreIcon sx={{ ...styleIcon }} />}
            defaultExpandIcon={<ChevronRightIcon sx={{ ...styleIcon }} />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
            {data.map((i) => (
                <StyledTreeItem
                    key={i.nodeId}
                    nodeId={i.nodeId}
                    labelText={i.labelText}
                    labelIcon={i.labelIcon}
                    labelIconColor={i?.labelIconColor}
                >
                    {i.childrenNodes?.map((j) => (
                        <StyledTreeItem
                            key={j.nodeId}
                            nodeId={j.nodeId}
                            labelText={j.labelText}
                            labelIcon={j.labelIcon}
                            labelIconColor={j?.labelIconColor}
                            onClick={j.onClick || defaultOnClick}
                        />
                    ))}
                </StyledTreeItem>
            ))}
        </TreeView>
    );
}
