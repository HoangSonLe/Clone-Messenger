import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversation: null,
};

const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        initConversation: (state, action) => {
            var data = action.payload;
            state.conversation = data;
        },
        sendMessage: (state, action) => {
            state.conversation.groupMessageListByTime.data.push(action.payload);
        },
        loadMoreMessage: (state, action) => {
            let firstOld = state.conversation.groupMessageListByTime.data.at(0);
            let actionLastIndex = action.payload.data.length - 1;
            let lastNew = action.payload.data.at(actionLastIndex);
            //GROUP TIME: Item cuối messages mới mà chung GROUPTIME với item đầu messages hiện tại
            if (firstOld.continuityKeyByTime == lastNew.continuityKeyByTime) {
                let firstOldMess = firstOld.groupMessageListByUser.at(0);
                let newLastIndex = lastNew.groupMessageListByUser.length - 1;
                let lastNewMess = lastNew.groupMessageListByUser.at(newLastIndex);
                //GROUP USER: Item cuối messages mới chung GROUP USER với item đầu messsages hiện tại
                if (firstOldMess.continuityKeyByUser == lastNewMess.continuityKeyByUser) {
                    //Merge list messages
                    firstOld.groupMessageListByUser[0].messages = [...lastNewMess.messages, ...firstOld.groupMessageListByUser[0].messages];
                    //Remove item trùng user đã thêm ở trên
                    lastNew.groupMessageListByUser.splice(newLastIndex, 1);
                }
                //Merge list messages by time
                state.conversation.groupMessageListByTime.data[0].groupMessageListByUser = [
                    ...lastNew.groupMessageListByUser,
                    ...state.conversation.groupMessageListByTime.data[0].groupMessageListByUser,
                ];
                //Remove item trùng time đã thêm ở trên
                action.payload.data.splice(actionLastIndex, 1);
            }
            state.conversation.groupMessageListByTime.data = [...action.payload.data, ...state.conversation.groupMessageListByTime.data];
            state.conversation.groupMessageListByTime.skip = action.payload.skip;
            state.conversation.groupMessageListByTime.hasMore = action.payload.hasMore;
        },
    },
});
const { actions, reducer } = messageSlice;
export const { initConversation, sendMessage, loadMoreMessage, resetState } = actions;

export default reducer;
