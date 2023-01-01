import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversation: null,
};

const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        initConversation: (state, action) => {
            var data = action.payload;
            state.conversation = data;
        },
        sendMessage: (state, action) => {
            state.conversation.groupMessageListByTime.data.push(action.payload);
        },
        loadMoreMessage: (state, action) => {
            state.conversation.groupMessageListByTime.data = [
                ...action.payload.data,
                ...state.conversation.groupMessageListByTime.data,
            ];
            state.conversation.groupMessageListByTime.skip =
                action.payload.skip;
        },
    },
});
const { actions, reducer } = messageSlice;
export const { initConversation, sendMessage, loadMoreMessage } = actions;

export default reducer;
