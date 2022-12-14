import classNames from "classnames/bind";
import styles from './DefaultMessageContent.scss';

const cx = classNames.bind(styles)

export default function DefaultMessageContent({children}){
    return (
        <div className={cx('content')}>
            {children ?? 'Select a chat or start a new conversation'}
        </div>
    )
}
