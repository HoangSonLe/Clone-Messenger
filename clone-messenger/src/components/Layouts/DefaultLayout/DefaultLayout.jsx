import classNames from "classnames/bind";
import DefaultMessageContent from "../../DefaultMessageContent/DefaultMessageContent";
import styles from './DefaultLayout.scss';

const cx = classNames.bind(styles)
export default function DefaultLayout(){
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navigation')}>
                Navigation
            </div>
            <div className={cx('content')}>
                <DefaultMessageContent>Select a chat or start a new conversation</DefaultMessageContent>
            </div>
        </div>
    )
}