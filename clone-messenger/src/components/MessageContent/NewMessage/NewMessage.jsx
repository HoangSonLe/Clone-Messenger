import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./NewMessage.module.scss";
import Messages from "../Messages";
import CustomPopover from "../../ui-kit/CustomPopover/CustomPopover";
const cx = classNames.bind(styles);
export default function NewMessage() {
    const { conversation } = useSelector((state) => state.message);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-message")}>
                {/* Header */}
                <div className={cx("header")}>
                    <div className={cx("title")}>To:</div>
                    <div className={cx("search")}>
                        <CustomPopover
                            renderItem={(onClick) => {
                                return <input onFocus={onClick} />;
                            }}
                            renderContent={() => {
                                return <div>COntent</div>;
                            }}
                        />
                    </div>
                </div>
                {/* Header */}
                {/* Messages */}
                {conversation ? <Messages /> : null}
                {/* Messages */}
            </div>
        </div>
    );
}
