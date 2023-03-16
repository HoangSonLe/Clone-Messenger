import { createSlice } from "@reduxjs/toolkit";
const mockData = {
    id: 1,
    name: "Chat Name Chat Name Chat NameChat NameChat Name Chat NameChat NameChat NameChat NameChat NameChat Name",
    isActive: true,
    lastMessage: "You left the group.",
    avatar: null,
    time: "5y",
};
const initialState = {
    chatGroupList: [],
    // chatGroupList: [...Array(10).keys()].map((i) => ({ ...mockData, id: i })),
    hasMore: true,
    lastConversationId: null,
};

const chatGroupSlice = createSlice({
    name: "chatGroup",
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        setLastConversationId: (state, action) => {
            let data = action.payload;
            state.lastConversationId = data;
        },
        addNewGroupAndRemoveTmp: (state, action, index = 0) => {
            let data = action.payload;
            state.chatGroupList = state.chatGroupList.filter((i) => i.isTmp == true);
            state.chatGroupList.splice(index, 0, data);
        },
        addGroup: (state, action, index = 0) => {
            let data = action.payload;
            state.chatGroupList.splice(index, 0, data);
        },
        addListGroup: (state, action) => {
            let response = action.payload;
            let { hasMore, data } = response;
            state.chatGroupList = [...state.chatGroupList, ...data];
            state.hasMore = hasMore;
        },
        removeGroup: (state, action) => {
            let data = action.payload;
            state.chatGroupList = state.chatGroupList.filter((i) => i.id != data.id);
        },
        updateLastMessage: (state, action) => {
            let data = action.payload;
            var g = state.chatGroupList.find((i) => i.id == data.chatGroupId);
            if (g) {
                var t = data.messageGroupByUser.messages;
                var lastIndex = t.length - 1;
                g.lastMessage = t[lastIndex];
            }
        },
        updateLastMessageInfor: (state, action) => {
            let data = action.payload;
            var g = state.chatGroupList.find((i) => i.id == data.chatGroupId);
            if (g) {
                g.lastMessage.messageStatus = data.status;
            }
        },
        updateStatusReadLastMessage: (state, action) => {
            let data = action.payload;
            var g = state.chatGroupList.find((i) => i.id == data.chatGroupId);
            if (g) {
                g.messageStatus = data;
            }
        },
        updateTmpChatGroup: (state, action) => {
            let data = action.payload;
            var g = state.chatGroupList.find((i) => i.isTmp == true);
            if (g) {
                g.name = data.name;
                g.listMembers = data.listMembers;
            }
        },
        updateChatGroupUser: (state, action) => {
            let { id, isOnline } = action.payload;
            state.chatGroupList.forEach((i) => {
                let findUser = i.listMembers.find((i) => i.userId == id);
                if (findUser) {
                    findUser.isOnline = isOnline;
                }
            });
        },
        setLoadMore: (state, action) => {
            state.hasMore = action.payload;
        },
    },
});
const { actions, reducer } = chatGroupSlice;
export const {
    addGroup,
    updateChatGroupUser,
    addNewGroupAndRemoveTmp,
    updateTmpChatGroup,
    setLastConversationId,
    updateStatusReadLastMessage,
    updateLastMessageInfor,
    updateLastMessage,
    addListGroup,
    removeGroup,
    setLoadMore,
    resetState,
} = actions;

export default reducer;
