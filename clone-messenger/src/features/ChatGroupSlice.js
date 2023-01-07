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
            var data = action.payload;
            state.chatGroupList.unshift(data);
        },
        addListGroup: (state, action) => {
            var response = action.payload;
            var { hasMore, data } = response;
            state.chatGroupList = [...state.chatGroupList, ...data];
            state.hasMore = hasMore;
        },
        removeGroup: (state, action) => {
            var data = action.payload;
            state.chatGroupList = state.chatGroupList.filter((i) => i.id != data.id);
        },
        updateLastMesage: (state, action) => {
            var data = action.payload;
            console.log(data);
        },
        setLoadMore: (state, action) => {
            state.hasMore = action.payload;
        },
    },
});
const { actions, reducer } = chatGroupSlice;
export const { addGroup,updateLastMesage, addListGroup, removeGroup, setLoadMore, resetState } = actions;

export default reducer;
