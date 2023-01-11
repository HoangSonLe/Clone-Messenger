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
};

const chatGroupSlice = createSlice({
    name: "chatGroup",
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        addGroup: (state, action) => {
            let data = action.payload;
            state.chatGroupList.unshift(data);
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
        setLoadMore: (state, action) => {
            state.hasMore = action.payload;
        },
    },
});
const { actions, reducer } = chatGroupSlice;
export const {
    addGroup,
    updateStatusReadLastMessage,
    updateLastMessageInfor,
    updateLastMessage,
    addListGroup,
    removeGroup,
    setLoadMore,
    resetState,
} = actions;

export default reducer;
