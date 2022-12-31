import { configureStore } from "@reduxjs/toolkit";
import chatGroupSlice from "../features/ChatGroup/ChatGroupSlice";
import pageDefaultSlice from "../features/PageDefaultSlice";
import messageSlice from "../features/Messages/MessageSlice";

const store = configureStore({
    reducer: {
        pageDefault: pageDefaultSlice,
        chatGroup: chatGroupSlice,
        message: messageSlice,
    },
});

export default store;
