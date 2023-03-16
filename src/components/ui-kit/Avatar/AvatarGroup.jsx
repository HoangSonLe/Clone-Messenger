import { Avatar } from "@mui/material";
import React, { Fragment } from "react";
import PropTypes from "prop-types";

import AvatarCustom from "./AvatarCustom";

function AvatarGroup({ max, customRender, data }) {
    return (
        <Fragment>
            <div style={{ display: "flex" }}>
                {data.slice(0, max).map((i) => customRender(i))}
                {data.length > max ? (
                    <AvatarCustom
                        width="14px"
                        height="14px"
                        customRender={(heightImage, widthImage) => (
                            <Avatar
                                sx={{
                                    height: heightImage,
                                    width: widthImage,
                                    marginLeft: "2px",
                                    fontSize: "12px",
                                }}
                            >
                                +{data.length - max}
                            </Avatar>
                        )}
                    />
                ) : null}
            </div>
        </Fragment>
    );
}
AvatarGroup.propTypes = {
    max: PropTypes.number,
    customRender: PropTypes.func,
    data: PropTypes.array,
};
export default AvatarGroup;
