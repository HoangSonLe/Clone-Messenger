import classNames from "classnames/bind";
import styles from './MenuContentDefaultLayout.module.scss';
const cx = classNames.bind(styles);

export default function MenuContentDefaultLayout({title,children}){
    return(
        <div className={cx("wrapper")}>
            <div className={cx("title-content")}>
                <div className={cx("title")}>
                    <h1>{title}</h1>
                </div>
                <div className={cx("actions")}>

                </div>
            </div>
            <div className={cx("content")}>
                {children}
            </div>
        </div>
    )
}