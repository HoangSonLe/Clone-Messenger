import ClearIcon from "@mui/icons-material/Clear";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRef } from "react";
import chatGroupApi from "../../../api/chatGroupApi";
import chatMessageApi from "../../../api/chatMessageApi";
import { updateTmpChatGroup } from "../../../features/ChatGroupSlice";
import { initConversation } from "../../../features/MessageSlice";
import { AvatarWithName } from "../../ui-kit/Avatar/AvatarCustom";
import CustomPopover from "../../ui-kit/CustomPopover/CustomPopover";
import Messages from "../Messages";
import styles from "./NewMessage.module.scss";
import { toastErrorList } from "../../../generals/utils";
const cx = classNames.bind(styles);
export default function NewMessage() {
    const dispatch = useDispatch();
    const [searchString, setSearchString] = useState("");
    const [searchList, setSearchList] = useState([]);
    const { currentUserId } = useSelector((state) => state.auth);
    const { chatGroupList } = useSelector((state) => state.chatGroup);
    const { listMembers } = chatGroupList[0];
    const debounceRef = useRef(null);
    // useDebugValue(memberList);
    let _fetchGetTmpConversation = async (memberList) => {
        try {
            let memberIds = memberList.map((i) => i.userId);
            let response = await chatMessageApi.searchChatGroup(memberIds);
            if (response.isSuccess == true) {
                dispatch(initConversation(response.data));
                dispatch(updateTmpChatGroup(response.data));
            }
        } catch (err) {
            toastErrorList(err?.response?.data);
        }
    };
    const handleAddMember = (value) => {
        var tmp = [...listMembers];
        tmp.push({
            userId: value.id,
            displayName: value.displayName,
            isOnline: false,
            addByName: "",
        });
        _fetchGetTmpConversation(tmp);
    };
    const removeMember = (value) => {
        var tmp = [...listMembers];
        tmp = tmp.filter((i) => i.userId != value.userId);
        _fetchGetTmpConversation(tmp);
    };
    let rowItem = (item) => {
        return (
            <AvatarWithName
                key={item.id}
                data={item}
                title={item.displayName}
                isOnline={item.isOnline}
                srcList={[item.avatarFileSrc]}
                height="48px"
                width="48px"
                forceDisplayContent={true}
                noneBold={true}
                onClickComponent={handleAddMember}
            />
        );
    };
    const handleSearch = (value) => {
        setSearchString(value);
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => _fetchGetUserList(value), 500);
    };
    //GET API DATA
    const _fetchGetUserList = async (value) => {
        try {
            let response = await chatGroupApi.getUserList({ searchValue: value });
            if (response.isSuccess == true) {
                setSearchList(response.data);
            }
        } catch (err) {
            toastErrorList(err?.response?.data);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-message")}>
                {/* Header */}
                <div className={cx("header")}>
                    <div className={cx("title")}>To:</div>
                    <div className={cx("search")}>
                        {listMembers.map((i) => {
                            if (i.userId == currentUserId) return null;
                            return (
                                <div className={cx("chip")} key={i.userId}>
                                    <div className={cx("name")}>{i.displayName}</div>
                                    <div className={cx("icon")} onClick={() => removeMember(i)}>
                                        <ClearIcon />
                                    </div>
                                </div>
                            );
                        })}
                        <CustomPopover
                            renderItem={(onClick) => {
                                return (
                                    <input
                                        value={searchString}
                                        className={cx("input")}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        onClick={onClick}
                                    />
                                );
                            }}
                            renderContent={() => {
                                return (
                                    <div className={cx("popup")}>
                                        {(searchList ?? [])
                                            .filter((i) =>
                                                listMembers.every((j) => j.userId != i.id)
                                            )
                                            .map((i) => rowItem(i))}
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
                {/* Header */}
                {/* Messages */}
                {listMembers?.length > 0 ? <Messages /> : null}
                {/* Messages */}
            </div>
        </div>
    );
}
