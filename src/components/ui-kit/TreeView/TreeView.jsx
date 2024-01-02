import React from "react";
import TreeItem from "@mui/lab/TreeItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    "& .MuiTreeItem-content": {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "&.Mui-expanded": {
            fontWeight: theme.typography.fontWeightRegular,
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: "var(--tree-view-color)",
        },
        "& .MuiTreeItem-label": {
            fontWeight: "inherit",
            color: "#0A7CFF",
        },
    },
}));

function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <TreeItem
            sx={{
                "& .MuiTreeItem-content": {
                    color: "#0A7CFF",
                    paddingRight: 10,
                    // "&.Mui-expanded": {
                    //     fontWeight: theme.typography.fontWeightRegular,
                    // },
                    // "&:hover": {
                    //     backgroundColor: theme.palette.action.hover,
                    // },
                    // "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused":
                    //     {
                    //         backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                    //         color: "var(--tree-view-color)",
                    //     },
                    "& .MuiTreeItem-label": {
                        fontWeight: "inherit",
                        color: "#0A7CFF",
                    },
                },
                "& .MuiTreeItem-group": {
                    marginLeft: 0,
                    "& .MuiTreeItem-content": {
                        paddingLeft: "40px",
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
            style={{
                "--tree-view-color": color,
                "--tree-view-bg-color": bgColor,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};
