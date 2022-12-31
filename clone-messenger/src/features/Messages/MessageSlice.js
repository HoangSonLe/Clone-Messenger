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
            state.messageList.push(action.payload);
        },
        loadMoreMessage: (state, action) => {
            state.messageList = [...action.payload, ...state.messageList];
        },
    },
});
const { actions, reducer } = messageSlice;
export const { initConversation } = actions;

export default reducer;
