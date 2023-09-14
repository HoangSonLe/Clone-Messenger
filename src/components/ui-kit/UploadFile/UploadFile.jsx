import { Backdrop, CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";

import { EUploadType } from "../../../const/enum";
import { toastErrorList, uploadFiles } from "../../../generals/utils";
import BaseUploadFile from "./BaseUploadFile";
import styles from "./UploadFile.module.scss";

const cx = classNames.bind(styles);

export default function UploadFile({
    isAutoUpload = false,
    type,
    multiple,
    onUploaded,
    renderComponent,
}) {
    const [isUploading, setUploading] = useState(false);
    const idInput = "file";
    const onUpload = async (files) => {
        setUploading(true);
        if (isAutoUpload) {
            try {
                let response = await uploadFiles(files);
                if (response.isSuccess == true) {
                    onUploaded(files);
                }
            } catch (err) {
                toastErrorList(err?.response?.data);
            }
        } else {
            onUploaded(files);
        }
        setUploading(false);
    };
    const onChange = (e) => {
        let files = e.target.files;
        onUpload(files);
    };
    let inputProps = {
        type: "file",
    };
    if (multiple == true) {
        inputProps.multiple = true;
    }
    if (typeof renderComponent == "function") {
        inputProps.style = {
            display: "none",
        };
    }
    let renderComp = typeof renderComponent == "function" && renderComponent(idInput);
    return (
        <div height="100%" className={cx("wrapper")}>
            {type == EUploadType.OnlyClick ? (
                <>
                    <input id={idInput} {...inputProps} onChange={onChange} />
                    <div>{renderComp}</div>
                </>
            ) : null}

            {type == EUploadType.OnlyDrop ? (
                <BaseUploadFile renderComponent={renderComp} onDrop={onUpload} />
            ) : null}

            {type == EUploadType.ClickAndDrop ? (
                <>
                    <input {...inputProps} onChange={onChange} />
                    <BaseUploadFile renderComponent={renderComp} onDrop={onUpload} />
                </>
            ) : null}
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isUploading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
UploadFile.defaultProps = {
    isAutoUpload: false,
    multiple: false,
    type: EUploadType.OnlyClick,
    disabled: false,
};

UploadFile.propTypes = {
    multiple: PropTypes.bool,
    isAutoUpload: PropTypes.bool,
    accept: PropTypes.string,
    onUploaded: PropTypes.func, //nếu multiple==true params cho onUploaded là list files, ngược lại chỉ là 1 file
    renderComponent: PropTypes.func,
};
