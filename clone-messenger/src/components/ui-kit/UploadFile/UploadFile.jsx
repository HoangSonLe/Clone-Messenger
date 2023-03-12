import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { EUploadType } from "../../../const/enum";
import { uploadFiles } from "../../../generals/utils";
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
    const idInput = "file";
    const onUpload = async (files) => {
        if (isAutoUpload) {
            try {
                let response = await uploadFiles(files);
                if (response.isSuccess == true) {
                    onUploaded(files);
                }
            } catch (err) {
                console.log("err", err);
            }
        } else {
            onUploaded(files);
        }
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
