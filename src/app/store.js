import { configureStore } from "@reduxjs/toolkit";
import chatGroupSlice from "../features/ChatGroupSlice";
import pageDefaultSlice from "../features/PageDefaultSlice";
import messageSlice from "../features/MessageSlice";
import authSlice from "../features/AuthSlice";
import userSlice from "../features/UserSlice";
import { baseRTKApi } from "../RTKQueryApis/base.api";

const store = configureStore({
    reducer: {
        pageDefault: pageDefaultSlice,
        chatGroup: chatGroupSlice,
        message: messageSlice,
        auth: authSlice,
        user: userSlice,
        [baseRTKApi.reducerPath] : baseRTKApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(baseRTKApi.middleware)
});

export default store;
