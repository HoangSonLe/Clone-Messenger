import classNames from "classnames/bind";

import { logo,lo } from "../../assets/img";
import styles from "./MobileView.module.scss";
const cx = classNames.bind(styles);

export default function MobileView() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo")}>
                <img src={logo} alt="logo" />
            </div>
            <div className={cx("container")}>
                <div>
                    <h1 className={cx("title")}>
                        Hang out <br /> anytime, anywhere
                    </h1>
                </div>
                <div className={cx("content")}>
                    Messenger makes it easy and fun to stay close to your favorite people.
                </div>
                <span>
                    <a
                        href="https://apps.apple.com/app/id454638411"
                        target="_blank"
                        rel="nofollow"
                        data-lynx-mode="origin"
                    >
                        <img
                            src={lo}
                            alt=""
                        />
                    </a>
                </span>
                <div style={{ flex: 1 }}></div>
                <div>
                    <span className={cx("meta")}> © Meta&nbsp;2023. </span>
                    <span className={cx("meta-content")}>
                        {" "}
                        The Apple and Google Play logos are trademarks of their respective owners.{" "}
                    </span>
                </div>
            </div>
        </div>
    );
}
