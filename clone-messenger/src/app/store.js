import { configureStore } from "@reduxjs/toolkit";
import chatGroupSlice from "../features/ChatGroup/ChatGroupSlice";
import pageDefaultSlice from "../features/PageDefaultSlice";
import messageSlice from "../features/Messages/MessageSlice";
import authSlice from "../features/AuthSlice";

const store = configureStore({
    reducer: {
        pageDefault: pageDefaultSlice,
        chatGroup: chatGroupSlice,
        message: messageSlice,
        auth: authSlice,
    },
});

export default store;
