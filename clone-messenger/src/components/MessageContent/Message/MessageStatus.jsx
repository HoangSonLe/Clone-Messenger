import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CircularProgress } from "@mui/material";

import { EMessageStatus } from "../../../const/enum";
import helper from "../../../generals/helper";

const styleIcon = {
    color: helper.getColorFromName("disabledIcon"),
    background: helper.getColorFromName("background"),
    height: "14px",
    width: "14px",
};
function MessageStatus({ status }) {
    let statusDiv = null;
    switch (status) {
        case EMessageStatus.Sending:
            statusDiv = (
                <CircularProgress
                    sx={{
                        color: helper.getColorFromName("disabledIcon"),
                    }}
                    size={14}
                />
            );
            break;
        case EMessageStatus.Sent:
            statusDiv = <CheckCircleIcon sx={styleIcon} />;
            break;
        default:
            break;
    }
    return <>{statusDiv}</>;
}
export default MessageStatus;
