import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi";
import { getOnlineUserList } from "../../features/UserSlice";
import helper from "../../generals/helper";
import Header from "../Layouts/Header/Header";
import { AvatarWithName } from "../ui-kit/Avatar/AvatarCustom";
import ScrollLoadMore from "../ui-kit/Scroll/SrollLoadMore";
import styles from "./ContactList.module.scss";
const cx = classNames.bind(styles);
const styleIcon = {
    color: helper.getColorFromName("primaryText"),
    background: helper.getColorFromName("webWash"),
    marginLeft: "12px",
};
export default function ContactList() {
    const dispatch = useDispatch();
    const { onlineUserList } = useSelector((state) => state.user);
    const { conversation } = useSelector((state) => state.message);
    const [isLoading, setLoading] = useState(true);

    const _fetchGetOnlineUserList = async () => {
        try {
            let response = await userApi.getOnlineUserList();
            if (response.isSuccess == true) {
                dispatch(getOnlineUserList(response.data));
            }
            setLoading(false);
        } catch (err) {
            console.log("err", err);
        }
    };
    useEffect(() => {
        _fetchGetOnlineUserList();
    }, []);

    const onScrollBottom = () => {
        setLoading(true);
        _fetchGetOnlineUserList();
    };
    return (
        <div className={cx("wrapper")}>
            <Header title={"People"}></Header>
            <div className={cx("title")}>Active contacts ({onlineUserList.length})</div>
            <div className={cx("contact-list")}>
                <ScrollLoadMore onScrollBottom={onScrollBottom}>
                    <>
                        {onlineUserList.map((i, index) => (
                            <AvatarWithName
                                key={i.id}
                                title={i.displayName}
                                isActive={false} //TODO
                                isOnline={true}
                                srcList={[i.avatarFileSrc]}
                                height="40px"
                                width="40px"
                            />
                        ))}
                        {isLoading ? (
                            <>
                                <AvatarWithName isLoading={true} height="40px" width="40px" />
                                <AvatarWithName isLoading={true} height="40px" width="40px" />
                                <AvatarWithName isLoading={true} height="40px" width="40px" />
                                <AvatarWithName isLoading={true} height="40px" width="40px" />
                            </>
                        ) : null}
                    </>
                </ScrollLoadMore>
            </div>
        </div>
    );
}
