import classNames from "classnames/bind";

import { logo } from "../../assets/img";
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
                        href="https://lm.messenger.com/l.php?u=https%3A%2F%2Fitunes.apple.com%2Fapp%2Fid454638411&amp;h=AT3ZJR2iLyqRYXgxg9BwY4ETWNvKS3XPybvxH90mYpgBwl-mfLSn1qMuFOE9FCltQrmAk8OjKq_bYVSbMurpobjRbBQfOX55tddXo8WsOY9TqTjPB92_Q4Ws1NO_C4udKoZncsxFVew6Zoi7"
                        target="_blank"
                        rel="nofollow"
                        data-lynx-mode="origin"
                    >
                        <img
                            src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.8562-6/119597221_2801552506611915_4465041091818364564_n.svg?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=6825c5&amp;_nc_ohc=LQXmqUyXDs4AX9iN-_2&amp;_nc_ht=scontent.fsgn5-14.fna&amp;oh=00_AfDHi8qG-7HUZPtGK4y9Sz785BjM0qc6yzaT3hInB0hZ-Q&amp;oe=641B4A75"
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
