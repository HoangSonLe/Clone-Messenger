import { configureStore } from "@reduxjs/toolkit";
import chatGroupSlice from "../features/ChatGroupSlice";
import pageDefaultSlice from "../features/PageDefaultSlice";
import messageSlice from "../features/MessageSlice";
import authSlice from "../features/AuthSlice";
import userSlice from "../features/UserSlice";
import { groupApi } from "../RTKQueryApi/chatGroupApi";

const store = configureStore({
    reducer: {
        pageDefault: pageDefaultSlice,
        chatGroup: chatGroupSlice,
        message: messageSlice,
        auth: authSlice,
        user: userSlice,
        [groupApi.reducerPath] : groupApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(groupApi.middleware)
});

export default store;
